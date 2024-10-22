-- CreateTable
CREATE TABLE "tbroles" (
    "PK_role" SERIAL NOT NULL,
    "role" VARCHAR(50) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "tbroles_pkey" PRIMARY KEY ("PK_role")
);

-- CreateTable
CREATE TABLE "tbusers" (
    "PK_user" SERIAL NOT NULL,
    "FK_role" INTEGER NOT NULL,
    "CI" VARCHAR(20) NOT NULL,
    "firstName" VARCHAR(80) NOT NULL,
    "lastName" VARCHAR(80) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "profileImage" VARCHAR(255),
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "tbusers_pkey" PRIMARY KEY ("PK_user")
);

-- CreateTable
CREATE TABLE "tbuserdetails" (
    "PK_detail" SERIAL NOT NULL,
    "FK_user" INTEGER NOT NULL,
    "phoneNumber" VARCHAR(15),
    "address" VARCHAR(255),
    "dateOfBirth" TIMESTAMP(3),
    "hireDate" TIMESTAMP(3),
    "position" VARCHAR(80),
    "salary" VARCHAR(30) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "tbuserdetails_pkey" PRIMARY KEY ("PK_detail")
);

-- CreateTable
CREATE TABLE "tbsalaries" (
    "PK_salary" SERIAL NOT NULL,
    "FK_user" INTEGER NOT NULL,
    "hoursWorked" INTEGER NOT NULL,
    "extraHours" INTEGER NOT NULL,
    "lateHours" INTEGER NOT NULL,
    "deductions" DECIMAL(10,2) NOT NULL,
    "netSalary" DECIMAL(10,2) NOT NULL,
    "paymentDate" TIMESTAMP(3) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "tbsalaries_pkey" PRIMARY KEY ("PK_salary")
);

-- CreateTable
CREATE TABLE "tbschedules" (
    "PK_schedule" SERIAL NOT NULL,
    "FK_user" INTEGER NOT NULL,
    "day" VARCHAR(10) NOT NULL,
    "checkIn" TIMESTAMP(3) NOT NULL,
    "checkOut" TIMESTAMP(3) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "tbschedules_pkey" PRIMARY KEY ("PK_schedule")
);

-- CreateTable
CREATE TABLE "tbassists" (
    "PK_attendance" SERIAL NOT NULL,
    "FK_user" INTEGER NOT NULL,
    "day" TIMESTAMP(3) NOT NULL,
    "checkIn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "checkOut" TIMESTAMP(3),

    CONSTRAINT "tbassists_pkey" PRIMARY KEY ("PK_attendance")
);

-- CreateTable
CREATE TABLE "tbcustomers" (
    "PK_customer" SERIAL NOT NULL,
    "CI" VARCHAR(20),
    "firstName" VARCHAR(80) NOT NULL,
    "lastName" VARCHAR(80) NOT NULL,
    "email" VARCHAR(255),
    "password" VARCHAR(255),
    "profileImage" VARCHAR(255),
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "tbcustomers_pkey" PRIMARY KEY ("PK_customer")
);

-- CreateTable
CREATE TABLE "tbcategories" (
    "PK_category" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "urlCategory" VARCHAR(20) NOT NULL,
    "description" VARCHAR(255),
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "tbcategories_pkey" PRIMARY KEY ("PK_category")
);

-- CreateTable
CREATE TABLE "tbsubcategories" (
    "PK_subcategory" SERIAL NOT NULL,
    "FK_category" INTEGER NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "urlSubcategory" VARCHAR(20) NOT NULL,
    "description" VARCHAR(255),
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "tbsubcategories_pkey" PRIMARY KEY ("PK_subcategory")
);

-- CreateTable
CREATE TABLE "tbsizes" (
    "PK_size" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "tbsizes_pkey" PRIMARY KEY ("PK_size")
);

-- CreateTable
CREATE TABLE "tbproducts" (
    "PK_product" SERIAL NOT NULL,
    "FK_subcategory" INTEGER NOT NULL,
    "FK_size" INTEGER NOT NULL,
    "SKU" VARCHAR(50) NOT NULL,
    "name" VARCHAR(80) NOT NULL,
    "urlProduct" VARCHAR(80) NOT NULL,
    "regularPrice" DECIMAL(10,2) NOT NULL,
    "offerPrice" DECIMAL(10,2),
    "stock" INTEGER NOT NULL,
    "description" VARCHAR(255),
    "images" TEXT[],
    "urlQR" VARCHAR(255),
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3),

    CONSTRAINT "tbproducts_pkey" PRIMARY KEY ("PK_product")
);

-- CreateTable
CREATE TABLE "tbsalesstatuses" (
    "PK_salestatus" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "description" VARCHAR(255),
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "tbsalesstatuses_pkey" PRIMARY KEY ("PK_salestatus")
);

-- CreateTable
CREATE TABLE "tbsales" (
    "PK_sale" SERIAL NOT NULL,
    "FK_customer" INTEGER NOT NULL,
    "FK_salestatus" INTEGER NOT NULL,
    "totalAmount" DECIMAL(10,2) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "tbsales_pkey" PRIMARY KEY ("PK_sale")
);

-- CreateTable
CREATE TABLE "tbsaledetails" (
    "PK_saledetail" SERIAL NOT NULL,
    "FK_sale" INTEGER NOT NULL,
    "FK_product" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitPrice" DECIMAL(10,2) NOT NULL,
    "subtotal" DECIMAL(10,2) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "tbsaledetails_pkey" PRIMARY KEY ("PK_saledetail")
);

-- CreateTable
CREATE TABLE "tbincome" (
    "PK_income" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "description" VARCHAR(255),
    "total" DECIMAL(10,2) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "tbincome_pkey" PRIMARY KEY ("PK_income")
);

-- CreateTable
CREATE TABLE "tbexpenses" (
    "PK_expense" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "description" VARCHAR(255),
    "total" DECIMAL(10,2) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "tbexpenses_pkey" PRIMARY KEY ("PK_expense")
);

-- CreateIndex
CREATE UNIQUE INDEX "tbroles_role_key" ON "tbroles"("role");

-- CreateIndex
CREATE UNIQUE INDEX "tbusers_CI_key" ON "tbusers"("CI");

-- CreateIndex
CREATE UNIQUE INDEX "tbusers_email_key" ON "tbusers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tbcustomers_CI_key" ON "tbcustomers"("CI");

-- CreateIndex
CREATE UNIQUE INDEX "tbcustomers_email_key" ON "tbcustomers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tbcategories_name_key" ON "tbcategories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tbcategories_urlCategory_key" ON "tbcategories"("urlCategory");

-- CreateIndex
CREATE UNIQUE INDEX "tbsubcategories_name_key" ON "tbsubcategories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tbsubcategories_urlSubcategory_key" ON "tbsubcategories"("urlSubcategory");

-- CreateIndex
CREATE UNIQUE INDEX "tbsizes_name_key" ON "tbsizes"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tbproducts_SKU_key" ON "tbproducts"("SKU");

-- CreateIndex
CREATE UNIQUE INDEX "tbproducts_urlProduct_key" ON "tbproducts"("urlProduct");

-- CreateIndex
CREATE UNIQUE INDEX "tbsalesstatuses_name_key" ON "tbsalesstatuses"("name");

-- AddForeignKey
ALTER TABLE "tbusers" ADD CONSTRAINT "tbusers_FK_role_fkey" FOREIGN KEY ("FK_role") REFERENCES "tbroles"("PK_role") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbuserdetails" ADD CONSTRAINT "tbuserdetails_FK_user_fkey" FOREIGN KEY ("FK_user") REFERENCES "tbusers"("PK_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbsalaries" ADD CONSTRAINT "tbsalaries_FK_user_fkey" FOREIGN KEY ("FK_user") REFERENCES "tbusers"("PK_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbschedules" ADD CONSTRAINT "tbschedules_FK_user_fkey" FOREIGN KEY ("FK_user") REFERENCES "tbusers"("PK_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbassists" ADD CONSTRAINT "tbassists_FK_user_fkey" FOREIGN KEY ("FK_user") REFERENCES "tbusers"("PK_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbsubcategories" ADD CONSTRAINT "tbsubcategories_FK_category_fkey" FOREIGN KEY ("FK_category") REFERENCES "tbcategories"("PK_category") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbproducts" ADD CONSTRAINT "tbproducts_FK_subcategory_fkey" FOREIGN KEY ("FK_subcategory") REFERENCES "tbsubcategories"("PK_subcategory") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbproducts" ADD CONSTRAINT "tbproducts_FK_size_fkey" FOREIGN KEY ("FK_size") REFERENCES "tbsizes"("PK_size") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbsales" ADD CONSTRAINT "tbsales_FK_customer_fkey" FOREIGN KEY ("FK_customer") REFERENCES "tbcustomers"("PK_customer") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbsales" ADD CONSTRAINT "tbsales_FK_salestatus_fkey" FOREIGN KEY ("FK_salestatus") REFERENCES "tbsalesstatuses"("PK_salestatus") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbsaledetails" ADD CONSTRAINT "tbsaledetails_FK_sale_fkey" FOREIGN KEY ("FK_sale") REFERENCES "tbsales"("PK_sale") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbsaledetails" ADD CONSTRAINT "tbsaledetails_FK_product_fkey" FOREIGN KEY ("FK_product") REFERENCES "tbproducts"("PK_product") ON DELETE RESTRICT ON UPDATE CASCADE;
