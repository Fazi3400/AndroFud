import {
  listUsers,
  UsersColumns,
  AdminUserNav,
} from "@/features/users";
import AdminShell from "@/components/admin/AdminShell";
import { ProductsDataTable } from "@/features/products";
import ErrorToaster from "@/components/layouts/ErrorToaster";

async function UsersPage() {
  const users = await listUsers({});

  return (
    <AdminShell heading="Users" description="Edit/Create new user by admin.">
      <AdminUserNav />
      <ProductsDataTable columns={UsersColumns} data={users || []} />
      <ErrorToaster />
    </AdminShell>
  );
}

export default UsersPage;

