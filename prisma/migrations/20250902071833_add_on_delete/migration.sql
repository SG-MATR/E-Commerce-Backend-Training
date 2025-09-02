-- DropForeignKey
ALTER TABLE "public"."products" DROP CONSTRAINT "products_category_id_fkey";

-- AddForeignKey
ALTER TABLE "public"."products" ADD CONSTRAINT "products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
