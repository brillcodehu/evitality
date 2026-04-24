import { relations } from "drizzle-orm";
import { users, accounts, sessions } from "./users";
import { clientProfiles } from "./clients";
import { availabilitySlots } from "./schedule";
import { bookings } from "./bookings";
import {
  programs,
  exercises,
  programExercises,
  clientPrograms,
} from "./programs";
import {
  workoutLogs,
  exerciseLogs,
  measurements,
  personalRecords,
} from "./workout-logs";
import { nutritionPlans, meals } from "./nutrition";
import { messages, notifications } from "./messages";
import { blogPosts } from "./blog";
import { documents } from "./documents";

// --- Users ---
export const usersRelations = relations(users, ({ one, many }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
  clientProfile: one(clientProfiles, {
    fields: [users.id],
    references: [clientProfiles.userId],
  }),
  // As trainer
  availabilitySlots: many(availabilitySlots),
  createdPrograms: many(programs),
  createdExercises: many(exercises),
  nutritionPlansCreated: many(nutritionPlans, { relationName: "trainerPlans" }),
  blogPosts: many(blogPosts),
  // As client
  bookings: many(bookings),
  clientPrograms: many(clientPrograms),
  workoutLogs: many(workoutLogs),
  measurements: many(measurements),
  personalRecords: many(personalRecords),
  nutritionPlans: many(nutritionPlans, { relationName: "clientPlans" }),
  documents: many(documents),
  // Messages
  sentMessages: many(messages, { relationName: "sender" }),
  receivedMessages: many(messages, { relationName: "receiver" }),
  notifications: many(notifications),
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

// --- Client Profiles ---
export const clientProfilesRelations = relations(
  clientProfiles,
  ({ one }) => ({
    user: one(users, {
      fields: [clientProfiles.userId],
      references: [users.id],
    }),
  })
);

// --- Schedule ---
export const availabilitySlotsRelations = relations(
  availabilitySlots,
  ({ one, many }) => ({
    trainer: one(users, {
      fields: [availabilitySlots.trainerId],
      references: [users.id],
    }),
    bookings: many(bookings),
  })
);

// --- Bookings ---
export const bookingsRelations = relations(bookings, ({ one }) => ({
  client: one(users, { fields: [bookings.clientId], references: [users.id] }),
  slot: one(availabilitySlots, {
    fields: [bookings.slotId],
    references: [availabilitySlots.id],
  }),
}));

// --- Programs ---
export const programsRelations = relations(programs, ({ one, many }) => ({
  trainer: one(users, {
    fields: [programs.trainerId],
    references: [users.id],
  }),
  programExercises: many(programExercises),
  clientPrograms: many(clientPrograms),
}));

export const exercisesRelations = relations(exercises, ({ one, many }) => ({
  creator: one(users, {
    fields: [exercises.createdBy],
    references: [users.id],
  }),
  programExercises: many(programExercises),
  exerciseLogs: many(exerciseLogs),
  personalRecords: many(personalRecords),
}));

export const programExercisesRelations = relations(
  programExercises,
  ({ one }) => ({
    program: one(programs, {
      fields: [programExercises.programId],
      references: [programs.id],
    }),
    exercise: one(exercises, {
      fields: [programExercises.exerciseId],
      references: [exercises.id],
    }),
  })
);

export const clientProgramsRelations = relations(
  clientPrograms,
  ({ one }) => ({
    client: one(users, {
      fields: [clientPrograms.clientId],
      references: [users.id],
    }),
    program: one(programs, {
      fields: [clientPrograms.programId],
      references: [programs.id],
    }),
  })
);

// --- Workout Logs ---
export const workoutLogsRelations = relations(
  workoutLogs,
  ({ one, many }) => ({
    client: one(users, {
      fields: [workoutLogs.clientId],
      references: [users.id],
    }),
    exerciseLogs: many(exerciseLogs),
  })
);

export const exerciseLogsRelations = relations(exerciseLogs, ({ one }) => ({
  workoutLog: one(workoutLogs, {
    fields: [exerciseLogs.workoutLogId],
    references: [workoutLogs.id],
  }),
  exercise: one(exercises, {
    fields: [exerciseLogs.exerciseId],
    references: [exercises.id],
  }),
}));

export const measurementsRelations = relations(measurements, ({ one }) => ({
  client: one(users, {
    fields: [measurements.clientId],
    references: [users.id],
  }),
}));

export const personalRecordsRelations = relations(
  personalRecords,
  ({ one }) => ({
    client: one(users, {
      fields: [personalRecords.clientId],
      references: [users.id],
    }),
    exercise: one(exercises, {
      fields: [personalRecords.exerciseId],
      references: [exercises.id],
    }),
  })
);

// --- Nutrition ---
export const nutritionPlansRelations = relations(
  nutritionPlans,
  ({ one, many }) => ({
    client: one(users, {
      fields: [nutritionPlans.clientId],
      references: [users.id],
      relationName: "clientPlans",
    }),
    trainer: one(users, {
      fields: [nutritionPlans.trainerId],
      references: [users.id],
      relationName: "trainerPlans",
    }),
    meals: many(meals),
  })
);

export const mealsRelations = relations(meals, ({ one }) => ({
  plan: one(nutritionPlans, {
    fields: [meals.planId],
    references: [nutritionPlans.id],
  }),
}));

// --- Messages ---
export const messagesRelations = relations(messages, ({ one }) => ({
  sender: one(users, {
    fields: [messages.senderId],
    references: [users.id],
    relationName: "sender",
  }),
  receiver: one(users, {
    fields: [messages.receiverId],
    references: [users.id],
    relationName: "receiver",
  }),
}));

export const notificationsRelations = relations(notifications, ({ one }) => ({
  user: one(users, {
    fields: [notifications.userId],
    references: [users.id],
  }),
}));

// --- Blog ---
export const blogPostsRelations = relations(blogPosts, ({ one }) => ({
  author: one(users, {
    fields: [blogPosts.authorId],
    references: [users.id],
  }),
}));

// --- Documents ---
export const documentsRelations = relations(documents, ({ one }) => ({
  user: one(users, { fields: [documents.userId], references: [users.id] }),
}));
