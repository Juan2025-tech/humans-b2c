-- CreateTable
CREATE TABLE "Waitlist" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefono" TEXT,
    "para_quien" TEXT NOT NULL,
    "plan_interes" TEXT,
    "fuente" TEXT,
    "utm_medium" TEXT,
    "utm_campaign" TEXT,
    "referrer" TEXT,
    "ip_hash" TEXT,
    "estado" TEXT NOT NULL DEFAULT 'nuevo',
    "notas" TEXT,
    "rgpd" BOOLEAN NOT NULL,
    "rgpd_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Waitlist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactMessage" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "mensaje" TEXT NOT NULL,
    "ip_hash" TEXT,
    "leido" BOOLEAN NOT NULL DEFAULT false,
    "rgpd" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ContactMessage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Waitlist_email_key" ON "Waitlist"("email");

-- CreateIndex
CREATE INDEX "Waitlist_email_idx" ON "Waitlist"("email");

-- CreateIndex
CREATE INDEX "Waitlist_fuente_idx" ON "Waitlist"("fuente");

-- CreateIndex
CREATE INDEX "Waitlist_createdAt_idx" ON "Waitlist"("createdAt");
