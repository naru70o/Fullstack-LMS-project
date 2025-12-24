import dotenv from 'dotenv'
import prisma from '../lib/prisma.js'

// Load environment variables
dotenv.config()

/**
 * Migration script to add new fields (price and discount) to all existing Course documents
 * Sets the default values from schema for courses that don't have these fields
 *
 * Note: Prisma applies default values when reading, so we need to use raw MongoDB queries
 * to find documents that actually don't have these fields stored in the database.
 */

async function migrateCourseFields() {
  try {
    console.log(
      'Starting migration: Adding price and discount fields to existing courses...',
    )

    // Use raw MongoDB queries to find and update courses that don't have these fields
    // Prisma applies defaults when reading, so we need raw queries to check actual DB state

    // Update all courses missing the price field
    console.log('Checking for courses missing price field...')
    const priceUpdateResult = await prisma.$runCommandRaw({
      update: 'courses',
      updates: [
        {
          q: {
            $or: [{ price: { $exists: false } }, { price: null }],
          },
          u: { $set: { price: 0 } },
          multi: true,
        },
      ],
    })

    // Update all courses missing the discount field
    console.log('Checking for courses missing discount field...')
    const discountUpdateResult = await prisma.$runCommandRaw({
      update: 'courses',
      updates: [
        {
          q: {
            $or: [{ discount: { $exists: false } }, { discount: null }],
          },
          u: { $set: { discount: 0 } },
          multi: true,
        },
      ],
    })

    const priceUpdated =
      (priceUpdateResult as { nModified: number }).nModified || 0
    const discountUpdated =
      (discountUpdateResult as { nModified: number }).nModified || 0
    const totalUpdated = priceUpdated + discountUpdated

    console.log(`✅ Updated price for ${priceUpdated} courses`)
    console.log(`✅ Updated discount for ${discountUpdated} courses`)

    if (totalUpdated === 0) {
      console.log(
        'No courses needed updating. All courses already have the price and discount fields stored in MongoDB.',
      )
      return
    }

    const updateResult = { count: totalUpdated }

    console.log(
      `✅ Migration completed successfully! Updated ${updateResult.count} courses.`,
    )
  } catch (error) {
    console.error('❌ Migration failed:', error)
    throw error
  } finally {
    // Close Prisma connection
    await prisma.$disconnect()
  }
}

// Run the migration
migrateCourseFields()
  .then(() => {
    console.log('Migration script finished.')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Migration script failed:', error)
    process.exit(1)
  })
