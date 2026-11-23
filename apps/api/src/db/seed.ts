import { db } from ".";
import { projects, tasks, user } from "./schema";

async function seed() {
    console.log("mulai seeding");

    const existingUser = await db
    .select().from(user).limit(1);

    if (existingUser.length === 0) {
        console.error("belum ada user di database!")
        process.exit(1);
    }

    const targetUser = existingUser[0];
  console.log(`Mengisi proyek untuk user: ${targetUser.email}`);
  // 2. Insert 4 proyek (3 active, 1 completed)
  const insertedProjects = await db
    .insert(projects)
    .values([
      {
        userId: targetUser.id,
        name: "Redesign Website SprintBoard",
        description: "Merapikan UI dashboard, halaman auth, dan komponen sidebar.",
        category: "Design",
        status: "active",
      },
      {
        userId: targetUser.id,
        name: "Backend API Elysia & Drizzle",
        description: "Membangun modul CRUD projects, tasks, dan integrasi Better Auth.",
        category: "Engineering",
        status: "active",
      },
      {
        userId: targetUser.id,
        name: "Rilis Aplikasi Mobile MVP",
        description: "Persiapan fitur fokus harian dan notifikasi pengingat task.",
        category: "Product",
        status: "active",
      },
      {
        userId: targetUser.id,
        name: "Setup Database & Authentication",
        description: "Konfigurasi PostgreSQL, Drizzle schema, dan email verification.",
        category: "Infrastructure",
        status: "completed",
      },
    ])
    .returning();
    await db.insert(tasks).values([
    {
      projectId: insertedProjects[0].id,
      title: "Buat toolbar filter proyek",
      description: "Tambahkan search input dan filter pill status.",
      status: "done",
      priority: "high",
      position: 0,
    },
    {
      projectId: insertedProjects[0].id,
      title: "Desain kartu proyek dengan progress bar",
      status: "in_progress",
      priority: "medium",
      position: 1,
    },
    {
      projectId: insertedProjects[1].id,
      title: "Buat modul CRUD tasks di Elysia",
      status: "todo",
      priority: "high",
      position: 0,
    },
  ]);
  console.log(`Berhasil seed ${insertedProjects.length} proyek + 3 tasks!`);
  process.exit(0); 
}

seed().catch((err) => {
  console.error("Gagal menjalankan seed:", err);
  process.exit(1);
});