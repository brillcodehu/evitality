import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq, or, ilike, and, desc } from "drizzle-orm";
import { ClientsTable } from "./clients-table";

export default async function ClientsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const search = q || "";

  const baseCondition = eq(users.role, "client" as const);

  const whereCondition = search
    ? and(
        baseCondition,
        or(
          ilike(users.name, `%${search}%`),
          ilike(users.email, `%${search}%`)
        )
      )
    : baseCondition;

  const clients = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      phone: users.phone,
      isActive: users.isActive,
      createdAt: users.createdAt,
    })
    .from(users)
    .where(whereCondition)
    .orderBy(desc(users.createdAt));

  return <ClientsTable clients={clients} initialSearch={search} />;
}
