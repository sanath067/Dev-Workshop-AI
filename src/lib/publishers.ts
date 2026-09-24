/**
 * Publisher lookup helpers for the Tailspin Toys database.
 *
 * These helpers read the publisher catalog used by static pages and tests while
 * keeping database access injectable through the shared Drizzle client.
 */
import { asc } from 'drizzle-orm';
import type { Database } from './db';
import { publishers } from '../../db/schema';
import type { Publisher } from '../types/game';

/**
 * Fetch all publishers as lightweight summary records.
 *
 * @param db - The active Drizzle database connection to query.
 * @returns A list of publishers sorted by name, including each publisher's id and name.
 */
export async function getAllPublishers(db: Database): Promise<Publisher[]> {
    const rows = await db
        .select({
            id: publishers.id,
            name: publishers.name,
        })
        .from(publishers)
        .orderBy(asc(publishers.name));

    return rows.map((row) => ({
        id: row.id,
        name: row.name,
    }));
}
