-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('alta', 'media', 'baixa');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('feito', 'pendente');

-- CreateTable
CREATE TABLE "tasks" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "finalDate" TEXT NOT NULL,
    "priority" "Priority" NOT NULL,
    "status" "Status" DEFAULT 'pendente',
    "account_id" INTEGER NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accounts" (
    "accounts_pk" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("accounts_pk")
);

-- CreateIndex
CREATE UNIQUE INDEX "accounts_email_key" ON "accounts"("email");

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "accounts"("accounts_pk") ON DELETE RESTRICT ON UPDATE CASCADE;
