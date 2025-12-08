/**
 * NOTE: THIS FILE IS NOT USED IN THE CURRENT IMPLEMENTATION
 * 
 * We chose Hasura (option 2) which auto-generates GraphQL from database schema.
 * All queries are in: src/graphql/queries/hasura.ts
 * Client implementation: src/lib/apolloClient.ts (fetch-based, not Apollo)
 * 
 * This file contains sample resolver implementations for reference only.
 * It was created for Apollo Server approach which we didn't implement.
 * 
 * If you want to use these resolvers:
 * 1. Set up Apollo Server
 * 2. Create database connection pool
 * 3. Fix TypeScript errors
 * 4. Import and use in your server
 */

// import { format, subMonths, startOfMonth, endOfMonth } from 'date-fns';
// import { pool } from './db'; // PostgreSQL connection pool

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

// =====================================================
// HELPER FUNCTIONS
// =====================================================

const parseDateRange = (dateRange?: string) => {
  const now = new Date();
  switch (dateRange) {
    case '7days':
      return { startDate: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000), endDate: now };
    case '30days':
      return { startDate: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000), endDate: now };
    case '90days':
      return { startDate: new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000), endDate: now };
    case 'year':
      return { startDate: new Date(now.getFullYear(), 0, 1), endDate: now };
    default:
      return { startDate: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000), endDate: now };
  }
};

// =====================================================
// DASHBOARD RESOLVERS
// =====================================================

export const dashboardResolvers = {
  Query: {
    // Main dashboard overview
    dashboardOverview: async (_, { dateRange }) => {
      const { startDate, endDate } = parseDateRange(dateRange);
      
      const query = `
        WITH current_stats AS (
          SELECT 
            COUNT(DISTINCT u.id) as total_users,
            COUNT(DISTINCT b.id) as total_orders,
            COALESCE(SUM(CASE WHEN b.payment_status = 'completed' THEN b.total_amount ELSE 0 END), 0) as total_revenue,
            COUNT(DISTINCT CASE WHEN u.last_active >= NOW() - INTERVAL '5 minutes' THEN u.id END) as active_sessions
          FROM users u
          LEFT JOIN bookings b ON u.id = b.user_id
          WHERE b.booked_at BETWEEN $1 AND $2
        ),
        previous_stats AS (
          SELECT 
            COUNT(DISTINCT u.id) as prev_users,
            COUNT(DISTINCT b.id) as prev_orders,
            COALESCE(SUM(CASE WHEN b.payment_status = 'completed' THEN b.total_amount ELSE 0 END), 0) as prev_revenue,
            COUNT(DISTINCT CASE WHEN u.last_active >= $1 - INTERVAL '5 minutes' THEN u.id END) as prev_sessions
          FROM users u
          LEFT JOIN bookings b ON u.id = b.user_id
          WHERE b.booked_at BETWEEN $1 - ($2 - $1) AND $1
        )
        SELECT 
          cs.*,
          ps.prev_users,
          ps.prev_orders,
          ps.prev_revenue,
          ps.prev_sessions,
          CASE WHEN ps.prev_users > 0 THEN ((cs.total_users - ps.prev_users)::float / ps.prev_users * 100) ELSE 0 END as user_growth,
          CASE WHEN ps.prev_orders > 0 THEN ((cs.total_orders - ps.prev_orders)::float / ps.prev_orders * 100) ELSE 0 END as order_growth,
          CASE WHEN ps.prev_revenue > 0 THEN ((cs.total_revenue - ps.prev_revenue)::float / ps.prev_revenue * 100) ELSE 0 END as revenue_growth,
          CASE WHEN ps.prev_sessions > 0 THEN ((cs.active_sessions - ps.prev_sessions)::float / ps.prev_sessions * 100) ELSE 0 END as session_growth
        FROM current_stats cs, previous_stats ps
      `;
      
      const result = await pool.query(query, [startDate, endDate]);
      return result.rows[0];
    },

    // Module usage statistics
    moduleUsage: async (_, { dateRange }) => {
      const { startDate, endDate } = parseDateRange(dateRange);
      
      const query = `
        WITH current_period AS (
          SELECT 
            service_type,
            COUNT(*) as current_count
          FROM bookings
          WHERE booked_at BETWEEN $1 AND $2
          GROUP BY service_type
        ),
        previous_period AS (
          SELECT 
            service_type,
            COUNT(*) as previous_count
          FROM bookings
          WHERE booked_at BETWEEN $1 - ($2 - $1) AND $1
          GROUP BY service_type
        )
        SELECT 
          cp.service_type,
          cp.current_count,
          pp.previous_count,
          CASE WHEN pp.previous_count > 0 
            THEN ((cp.current_count - pp.previous_count)::float / pp.previous_count * 100) 
            ELSE 0 
          END as growth
        FROM current_period cp
        LEFT JOIN previous_period pp ON cp.service_type = pp.service_type
      `;
      
      const result = await pool.query(query, [startDate, endDate]);
      
      const modules = {
        foodDelivery: { total: 0, growth: 0 },
        travel: { total: 0, growth: 0 },
        shopping: { total: 0, growth: 0 },
        tickets: { total: 0, growth: 0 }
      };
      
      result.rows.forEach(row => {
        if (row.service_type === 'food') {
          modules.foodDelivery = { total: row.current_count, growth: row.growth };
        } else if (row.service_type === 'flight' || row.service_type === 'hotel' || row.service_type === 'train') {
          modules.travel.total += row.current_count;
          modules.travel.growth += row.growth;
        } else if (row.service_type === 'delivery') {
          modules.shopping = { total: row.current_count, growth: row.growth };
        } else if (row.service_type === 'movie' || row.service_type === 'metro') {
          modules.tickets.total += row.current_count;
          modules.tickets.growth += row.growth;
        }
      });
      
      return modules;
    },

    // Revenue trend over months
    revenueTrend: async (_, { months = 6 }) => {
      const query = `
        SELECT 
          TO_CHAR(DATE_TRUNC('month', booked_at), 'Mon') as month,
          SUM(CASE WHEN payment_status = 'completed' THEN total_amount ELSE 0 END) as value,
          SUM(CASE WHEN payment_status = 'completed' AND service_type = 'food' THEN total_amount ELSE 0 END) as food_revenue,
          SUM(CASE WHEN payment_status = 'completed' AND service_type IN ('flight', 'hotel', 'train') THEN total_amount ELSE 0 END) as travel_revenue,
          SUM(CASE WHEN payment_status = 'completed' AND service_type = 'delivery' THEN total_amount ELSE 0 END) as shopping_revenue,
          SUM(CASE WHEN payment_status = 'completed' AND service_type IN ('movie', 'metro') THEN total_amount ELSE 0 END) as tickets_revenue
        FROM bookings
        WHERE booked_at >= NOW() - INTERVAL '${months} months'
        GROUP BY DATE_TRUNC('month', booked_at)
        ORDER BY DATE_TRUNC('month', booked_at)
      `;
      
      const result = await pool.query(query);
      return result.rows;
    },

    // Service revenue breakdown
    serviceRevenue: async (_, { dateRange }) => {
      const { startDate, endDate } = parseDateRange(dateRange);
      
      const query = `
        WITH current_revenue AS (
          SELECT 
            service_type as service_name,
            SUM(CASE WHEN payment_status = 'completed' THEN total_amount ELSE 0 END) as revenue,
            COUNT(*) as bookings
          FROM bookings
          WHERE booked_at BETWEEN $1 AND $2
          GROUP BY service_type
        ),
        previous_revenue AS (
          SELECT 
            service_type,
            SUM(CASE WHEN payment_status = 'completed' THEN total_amount ELSE 0 END) as prev_revenue
          FROM bookings
          WHERE booked_at BETWEEN $1 - ($2 - $1) AND $1
          GROUP BY service_type
        )
        SELECT 
          cr.service_name,
          cr.revenue,
          cr.bookings,
          CASE WHEN pr.prev_revenue > 0 
            THEN ((cr.revenue - pr.prev_revenue)::float / pr.prev_revenue * 100) 
            ELSE 0 
          END as growth
        FROM current_revenue cr
        LEFT JOIN previous_revenue pr ON cr.service_name = pr.service_type
        ORDER BY cr.revenue DESC
      `;
      
      const result = await pool.query(query, [startDate, endDate]);
      return result.rows;
    },

    // Module distribution (pie chart data)
    moduleDistribution: async (_, { dateRange }) => {
      const { startDate, endDate } = parseDateRange(dateRange);
      
      const query = `
        WITH service_counts AS (
          SELECT 
            CASE 
              WHEN service_type = 'food' THEN 'Food Delivery'
              WHEN service_type IN ('flight', 'hotel', 'train') THEN 'Travel'
              WHEN service_type = 'delivery' THEN 'Shopping'
              WHEN service_type IN ('movie', 'metro') THEN 'Tickets'
              ELSE 'Other'
            END as name,
            COUNT(*) as value
          FROM bookings
          WHERE booked_at BETWEEN $1 AND $2
          GROUP BY name
        ),
        total_count AS (
          SELECT SUM(value) as total FROM service_counts
        )
        SELECT 
          sc.name,
          sc.value,
          ROUND((sc.value::float / tc.total * 100)::numeric, 2) as percentage,
          CASE 
            WHEN sc.name = 'Food Delivery' THEN '#f97316'
            WHEN sc.name = 'Travel' THEN '#3b82f6'
            WHEN sc.name = 'Shopping' THEN '#a855f7'
            WHEN sc.name = 'Tickets' THEN '#ec4899'
            ELSE '#6b7280'
          END as color
        FROM service_counts sc, total_count tc
        ORDER BY sc.value DESC
      `;
      
      const result = await pool.query(query, [startDate, endDate]);
      return result.rows;
    },

    // Live orders feed
    liveOrders: async (_, { limit = 10 }) => {
      const query = `
        SELECT 
          b.id,
          u.name as customer_name,
          b.service_type,
          CASE 
            WHEN b.service_type = 'hotel' THEN h.name
            WHEN b.service_type = 'flight' THEN f.airline || ' ' || f.flight_number
            WHEN b.service_type = 'food' THEN fi.name
            WHEN b.service_type = 'delivery' THEN di.name
            ELSE 'Service Item'
          END as item_name,
          b.total_amount as amount,
          b.booking_status as status,
          b.booked_at as timestamp,
          p.name as provider_name
        FROM bookings b
        JOIN users u ON b.user_id = u.id
        JOIN providers p ON b.provider_id = p.id
        LEFT JOIN hotels h ON b.item_id = h.id AND b.service_type = 'hotel'
        LEFT JOIN flights f ON b.item_id = f.id AND b.service_type = 'flight'
        LEFT JOIN food_items fi ON b.item_id = fi.id AND b.service_type = 'food'
        LEFT JOIN delivery_items di ON b.item_id = di.id AND b.service_type = 'delivery'
        ORDER BY b.booked_at DESC
        LIMIT $1
      `;
      
      const result = await pool.query(query, [limit]);
      return result.rows;
    },

    // Top demanded areas
    topAreas: async (_, { limit = 5, dateRange }) => {
      const { startDate, endDate } = parseDateRange(dateRange);
      
      const query = `
        WITH area_stats AS (
          SELECT 
            COALESCE(u.city, 'Unknown') as area,
            COUNT(b.id) as orders,
            SUM(CASE WHEN b.payment_status = 'completed' THEN b.total_amount ELSE 0 END) as revenue,
            MODE() WITHIN GROUP (ORDER BY b.service_type) as top_service
          FROM bookings b
          JOIN users u ON b.user_id = u.id
          WHERE b.booked_at BETWEEN $1 AND $2
          GROUP BY u.city
        ),
        previous_stats AS (
          SELECT 
            COALESCE(u.city, 'Unknown') as area,
            COUNT(b.id) as prev_orders
          FROM bookings b
          JOIN users u ON b.user_id = u.id
          WHERE b.booked_at BETWEEN $1 - ($2 - $1) AND $1
          GROUP BY u.city
        )
        SELECT 
          a.area,
          a.orders,
          a.revenue,
          a.top_service,
          CASE WHEN p.prev_orders > 0 
            THEN ((a.orders - p.prev_orders)::float / p.prev_orders * 100) 
            ELSE 0 
          END as growth
        FROM area_stats a
        LEFT JOIN previous_stats p ON a.area = p.area
        ORDER BY a.revenue DESC
        LIMIT $3
      `;
      
      const result = await pool.query(query, [startDate, endDate, limit]);
      return result.rows;
    },
  }
};

// =====================================================
// VENDOR RESOLVERS
// =====================================================

export const vendorResolvers = {
  Query: {
    // Vendor dashboard overview
    vendorDashboard: async (_, { vendorAccountId, dateRange }) => {
      const query = `
        SELECT * FROM vendor_revenue_dashboard 
        WHERE vendor_account_id = $1
      `;
      
      const result = await pool.query(query, [vendorAccountId]);
      return result.rows[0];
    },

    // Vendor bookings with pagination
    vendorBookings: async (_, { vendorAccountId, page = 1, limit = 20, status, serviceType, dateRange }) => {
      const offset = (page - 1) * limit;
      const { startDate, endDate } = parseDateRange(dateRange);
      
      let whereClause = 'WHERE vendor_account_id = $1 AND booked_at BETWEEN $2 AND $3';
      const params = [vendorAccountId, startDate, endDate];
      let paramIndex = 4;
      
      if (status) {
        whereClause += ` AND booking_status = $${paramIndex}`;
        params.push(status);
        paramIndex++;
      }
      
      if (serviceType) {
        whereClause += ` AND service_type = $${paramIndex}`;
        params.push(serviceType);
        paramIndex++;
      }
      
      const countQuery = `SELECT COUNT(*) FROM vendor_booking_details ${whereClause}`;
      const dataQuery = `
        SELECT * FROM vendor_booking_details 
        ${whereClause}
        ORDER BY booked_at DESC
        LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
      `;
      
      params.push(limit, offset);
      
      const [countResult, dataResult] = await Promise.all([
        pool.query(countQuery, params.slice(0, -2)),
        pool.query(dataQuery, params)
      ]);
      
      return {
        total: parseInt(countResult.rows[0].count),
        page,
        limit,
        bookings: dataResult.rows
      };
    },

    // Vendor service performance
    vendorServicePerformance: async (_, { vendorAccountId }) => {
      const query = `
        SELECT * FROM vendor_service_performance 
        WHERE vendor_account_id = $1
      `;
      
      const result = await pool.query(query, [vendorAccountId]);
      
      // Fetch recent reviews for each provider
      for (const row of result.rows) {
        const reviewsQuery = `
          SELECT 
            r.rating,
            r.review,
            u.name as customer_name,
            r.created_at
          FROM ratings r
          JOIN bookings b ON r.item_id = b.item_id AND r.service_type = b.service_type
          JOIN users u ON r.user_id = u.id
          JOIN providers p ON b.provider_id = p.id
          WHERE p.id = $1
          ORDER BY r.created_at DESC
          LIMIT 5
        `;
        const reviewsResult = await pool.query(reviewsQuery, [row.provider_id]);
        row.recent_reviews = reviewsResult.rows;
      }
      
      return result.rows;
    },

    // Vendor settlements
    vendorSettlements: async (_, { vendorAccountId, status, page = 1, limit = 20 }) => {
      const offset = (page - 1) * limit;
      
      let whereClause = 'WHERE vendor_account_id = $1';
      const params = [vendorAccountId];
      
      if (status) {
        whereClause += ' AND settlement_status = $2';
        params.push(status);
      }
      
      const countQuery = `SELECT COUNT(*) FROM vendor_settlements ${whereClause}`;
      const dataQuery = `
        SELECT 
          vs.*,
          json_build_object(
            'customerName', u.name,
            'serviceType', b.service_type,
            'serviceName', 'Service Item'
          ) as booking_details
        FROM vendor_settlements vs
        JOIN bookings b ON vs.booking_id = b.id
        JOIN users u ON b.user_id = u.id
        ${whereClause}
        ORDER BY vs.created_at DESC
        LIMIT $${params.length + 1} OFFSET $${params.length + 2}
      `;
      
      params.push(limit, offset);
      
      const [countResult, dataResult] = await Promise.all([
        pool.query(countQuery, params.slice(0, status ? 2 : 1)),
        pool.query(dataQuery, params)
      ]);
      
      return {
        total: parseInt(countResult.rows[0].count),
        page,
        limit,
        settlements: dataResult.rows
      };
    },

    // Vendor settlement summary
    vendorSettlementSummary: async (_, { vendorAccountId }) => {
      const query = `
        SELECT * FROM vendor_settlement_summary 
        WHERE vendor_account_id = $1
      `;
      
      const result = await pool.query(query, [vendorAccountId]);
      return result.rows[0];
    },

    // Vendor monthly analytics
    vendorMonthlyAnalytics: async (_, { vendorAccountId, months = 12 }) => {
      const query = `
        SELECT * FROM vendor_monthly_analytics 
        WHERE vendor_account_id = $1
        AND month >= DATE_TRUNC('month', CURRENT_DATE - INTERVAL '${months} months')
        ORDER BY month DESC
      `;
      
      const result = await pool.query(query, [vendorAccountId]);
      return result.rows;
    },

    // Vendor profile
    vendorProfile: async (_, { vendorAccountId }) => {
      const query = `
        SELECT 
          va.*,
          vp.*
        FROM vendor_accounts va
        JOIN vendor_profiles vp ON va.id = vp.vendor_account_id
        WHERE va.id = $1
      `;
      
      const result = await pool.query(query, [vendorAccountId]);
      return result.rows[0];
    },

    // Vendor bank accounts
    vendorBankAccounts: async (_, { vendorAccountId }) => {
      const query = `
        SELECT * FROM vendor_bank_accounts 
        WHERE vendor_account_id = $1
        ORDER BY is_primary DESC, created_at DESC
      `;
      
      const result = await pool.query(query, [vendorAccountId]);
      return result.rows;
    },
  },

  Mutation: {
    // Update vendor profile
    updateVendorProfile: async (_, { vendorAccountId, input }) => {
      const fields = Object.keys(input);
      const values = Object.values(input);
      
      const setClause = fields.map((field, index) => 
        `${field} = $${index + 2}`
      ).join(', ');
      
      const query = `
        UPDATE vendor_profiles 
        SET ${setClause}, updated_at = NOW()
        WHERE vendor_account_id = $1
        RETURNING *
      `;
      
      try {
        const result = await pool.query(query, [vendorAccountId, ...values]);
        return {
          success: true,
          message: 'Profile updated successfully',
          profile: result.rows[0]
        };
      } catch (error) {
        return {
          success: false,
          message: error.message
        };
      }
    },

    // Add bank account
    addVendorBankAccount: async (_, { vendorAccountId, input }) => {
      const query = `
        INSERT INTO vendor_bank_accounts (
          vendor_account_id,
          bank_name,
          account_holder_name,
          account_number,
          ifsc_code,
          account_type,
          is_primary
        ) VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
      `;
      
      try {
        const result = await pool.query(query, [
          vendorAccountId,
          input.bankName,
          input.accountHolderName,
          input.accountNumber,
          input.ifscCode,
          input.accountType,
          input.isPrimary || false
        ]);
        
        return {
          success: true,
          message: 'Bank account added successfully',
          bankAccount: result.rows[0]
        };
      } catch (error) {
        return {
          success: false,
          message: error.message
        };
      }
    },

    // Process settlement (Admin only)
    processSettlement: async (_, { settlementId, status }) => {
      const query = `
        UPDATE vendor_settlements 
        SET settlement_status = $2,
            settled_at = CASE WHEN $2 = 'completed' THEN NOW() ELSE NULL END
        WHERE id = $1
        RETURNING *
      `;
      
      try {
        const result = await pool.query(query, [settlementId, status]);
        return {
          success: true,
          message: 'Settlement processed successfully',
          settlement: result.rows[0]
        };
      } catch (error) {
        return {
          success: false,
          message: error.message
        };
      }
    },
  }
};

// =====================================================
// ADMIN RESOLVERS
// =====================================================

export const adminResolvers = {
  Query: {
    // All vendors list
    allVendors: async (_, { page = 1, limit = 20, search, isActive, serviceType }) => {
      const offset = (page - 1) * limit;
      
      let whereClause = 'WHERE 1=1';
      const params = [];
      let paramIndex = 1;
      
      if (search) {
        whereClause += ` AND (vp.business_name ILIKE $${paramIndex} OR va.email ILIKE $${paramIndex})`;
        params.push(`%${search}%`);
        paramIndex++;
      }
      
      if (isActive !== undefined) {
        whereClause += ` AND va.is_active = $${paramIndex}`;
        params.push(isActive);
        paramIndex++;
      }
      
      if (serviceType) {
        whereClause += ` AND p.service_type = $${paramIndex}`;
        params.push(serviceType);
        paramIndex++;
      }
      
      const countQuery = `
        SELECT COUNT(DISTINCT va.id)
        FROM vendor_accounts va
        JOIN vendor_profiles vp ON va.id = vp.vendor_account_id
        LEFT JOIN providers p ON va.id = p.vendor_account_id
        ${whereClause}
      `;
      
      const dataQuery = `
        SELECT 
          va.id as vendor_account_id,
          va.email,
          va.phone,
          vp.business_name,
          vp.business_type,
          p.service_type,
          va.is_active,
          va.is_verified,
          COUNT(DISTINCT b.id) as total_bookings,
          SUM(CASE WHEN b.payment_status = 'completed' THEN b.total_amount ELSE 0 END) as total_revenue,
          AVG(r.rating) as average_rating,
          SUM(CASE WHEN vs.settlement_status = 'pending' THEN vs.net_amount ELSE 0 END) as pending_settlements,
          va.created_at
        FROM vendor_accounts va
        JOIN vendor_profiles vp ON va.id = vp.vendor_account_id
        LEFT JOIN providers p ON va.id = p.vendor_account_id
        LEFT JOIN bookings b ON p.id = b.provider_id
        LEFT JOIN vendor_settlements vs ON va.id = vs.vendor_account_id
        LEFT JOIN ratings r ON b.item_id = r.item_id AND b.service_type = r.service_type
        ${whereClause}
        GROUP BY va.id, vp.business_name, vp.business_type, p.service_type
        ORDER BY va.created_at DESC
        LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
      `;
      
      params.push(limit, offset);
      
      const [countResult, dataResult] = await Promise.all([
        pool.query(countQuery, params.slice(0, -2)),
        pool.query(dataQuery, params)
      ]);
      
      return {
        total: parseInt(countResult.rows[0].count),
        page,
        limit,
        vendors: dataResult.rows
      };
    },

    // Top vendors
    topVendors: async (_, { limit = 10, sortBy = 'revenue' }) => {
      const orderBy = sortBy === 'revenue' ? 'total_revenue DESC' : 'total_bookings DESC';
      
      const query = `
        SELECT * FROM vendor_revenue_dashboard 
        ORDER BY ${orderBy}
        LIMIT $1
      `;
      
      const result = await pool.query(query, [limit]);
      return result.rows;
    },

    // Settlement overview
    settlementOverview: async () => {
      const query = `
        SELECT 
          COUNT(CASE WHEN settlement_status = 'pending' THEN 1 END) as total_pending,
          COUNT(CASE WHEN settlement_status = 'processing' THEN 1 END) as total_processing,
          COUNT(CASE WHEN settlement_status = 'completed' THEN 1 END) as total_completed,
          SUM(CASE WHEN settlement_status = 'pending' THEN net_amount ELSE 0 END) as pending_amount,
          SUM(CASE WHEN settlement_status = 'completed' THEN net_amount ELSE 0 END) as completed_amount,
          SUM(commission_amount) as total_commission
        FROM vendor_settlements
      `;
      
      const result = await pool.query(query);
      return result.rows[0];
    },

    // Pending settlements
    pendingSettlements: async (_, { limit = 20 }) => {
      const query = `
        SELECT 
          vs.*,
          vp.business_name,
          EXTRACT(DAY FROM NOW() - vs.created_at) as days_overdue
        FROM vendor_settlements vs
        JOIN vendor_profiles vp ON vs.vendor_account_id = vp.vendor_account_id
        WHERE vs.settlement_status = 'pending'
        ORDER BY vs.created_at ASC
        LIMIT $1
      `;
      
      const result = await pool.query(query, [limit]);
      return result.rows;
    },
  }
};

// =====================================================
// COMBINE ALL RESOLVERS
// =====================================================

export const resolvers = {
  Query: {
    ...dashboardResolvers.Query,
    ...vendorResolvers.Query,
    ...adminResolvers.Query,
  },
  Mutation: {
    ...vendorResolvers.Mutation,
  },
};
