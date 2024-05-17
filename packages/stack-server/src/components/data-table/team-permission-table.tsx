'use client';;
import { useState } from "react";
import * as yup from "yup";
import { ColumnDef, Row, Table } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./elements/column-header";
import { DataTable } from "./elements/data-table";
import { ActionCell, BadgeCell, TextCell } from "./elements/cells";
import { SearchToolbarItem } from "./elements/toolbar-items";
import { FormDialog } from "../form-dialog";
import { InputField } from "../form-fields";
import { ActionDialog } from "../action-dialog";
import { useAdminApp } from "@/app/(main)/(protected)/projects/[projectId]/use-admin-app";
import { PermissionDefinitionJson } from "@stackframe/stack-shared/dist/interface/clientInterface";
import { PermissionListField } from "../permission-field";

function toolbarRender<TData>(table: Table<TData>) {
  return (
    <>
      <SearchToolbarItem table={table} keyName="id" placeholder="Filter by ID" />
    </>
  );
}

function EditDialog(props: {
  open: boolean,
  onOpenChange: (open: boolean) => void,
  selectedPermissionId: string,
}) {
  const stackAdminApp = useAdminApp();
  const permissions = stackAdminApp.usePermissionDefinitions();
  const currentPermission = permissions.find((p) => p.id === props.selectedPermissionId);
  if (!currentPermission) {
    return null;
  }

  const formSchema = yup.object({
    id: yup.string().required().notOneOf(permissions.map((p) => p.id).filter(p => p !== props.selectedPermissionId), "ID already exists"),
    description: yup.string(),
    containPermissionIds: yup.array().of(yup.string().required()).required(),
  });

  return <FormDialog
    open={props.open}
    onOpenChange={props.onOpenChange}
    title="Edit Permission"
    formSchema={formSchema}
    defaultValues={currentPermission}
    okButton={{ label: "Save" }}
    render={(form) => (
      <>
        <InputField control={form.control} label="ID" name="id" />
        <InputField control={form.control} label="Description" name="description" />
        <PermissionListField
          control={form.control} 
          name="containPermissionIds" 
          permissions={permissions} 
          type="edit" 
          selectedPermissionId={props.selectedPermissionId} 
        />
      </>
    )}
    onSubmit={async (values) => {
      await stackAdminApp.updatePermissionDefinition(props.selectedPermissionId, values);
    }}
    cancelButton
  />;
}

function DeleteDialog(props: {
  permission: PermissionDefinitionJson,
  open: boolean,
  onOpenChange: (open: boolean) => void,
}) {
  const stackApp = useAdminApp();
  return <ActionDialog
    open={props.open}
    onOpenChange={props.onOpenChange}
    title="Delete Permission"
    danger
    cancelButton
    okButton={{ label: "Delete Permission", onClick: async () => { await stackApp.deletePermissionDefinition(props.permission.id); } }}
    confirmText="I understand this will remove the permission from all users and other permissions that contain it."
  >
    {`Are you sure you want to delete the permission "${props.permission.id}"?`}
  </ActionDialog>;
}

function Actions({ row }: { row: Row<PermissionDefinitionJson> }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <>
      <EditDialog selectedPermissionId={row.original.id} open={isEditModalOpen} onOpenChange={setIsEditModalOpen} />
      <DeleteDialog permission={row.original} open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen} />
      <ActionCell
        items={[
          {
            item: "Edit",
            onClick: () => setIsEditModalOpen(true),
          }
        ]}
        dangerItems={[{
          item: "Delete",
          onClick: () => setIsDeleteModalOpen(true),
        }]}
      />
    </>
  );
}

const columns: ColumnDef<PermissionDefinitionJson>[] =  [
  {
    accessorKey: "id",
    header: ({ column }) => <DataTableColumnHeader column={column} title="ID" />,
    cell: ({ row }) => <TextCell size={160}>{row.getValue("id")}</TextCell>,
  },
  {
    accessorKey: "description",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Description" />,
    cell: ({ row }) => <TextCell size={200}>{row.getValue("description")}</TextCell>,
  },
  {
    accessorKey: "containPermissionIds",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Contained Permissions" />,
    cell: ({ row }) => <BadgeCell size={120} badges={row.getValue("containPermissionIds")} />,
  },
  {
    id: "actions",
    cell: ({ row }) => <Actions row={row} />,
  },
];

export function TeamPermissionTable(props: { permissions: PermissionDefinitionJson[] }) {
  return <DataTable data={props.permissions} columns={columns} toolbarRender={toolbarRender} />;
}
