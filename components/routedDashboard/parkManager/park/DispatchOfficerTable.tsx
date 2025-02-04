"use client";
import React, { useState, forwardRef, useEffect } from "react";
import { SlOptions } from "react-icons/sl";
import Image from "next/image";
import MaterialTable from "@material-table/core";
import {
  AddBox,
  Check,
  Clear,
  DeleteOutline,
  Edit,
  Search,
  Save,
} from "@mui/icons-material";
// Define the structure of a row in the data
interface Row {
  id: string; // Add the `id` field
  name: string;
  vehicle_type: string;
  engine_no: string;
  provider_agency: string;
  date: string;
}

// Define the structure of a column in the table
interface Column {
  title: string;
  field: keyof Row | string; // Ensure `field` matches the keys of `Row`
  headerStyle?: React.CSSProperties;
  cellStyle?: React.CSSProperties;
  render?: (rowData: Row) => React.JSX.Element;
}

const DispatchOfficerTable = () => {
  const [dropdownIndex, setDropdownIndex] = useState<number | null>(null);

  const toggleDropdown = (index: number) => {
    setDropdownIndex(dropdownIndex === index ? null : index); // Toggle dropdown visibility
  };

  const data: any = [
    {
      id: 1,
      name: "Tade Adesanya",
      email: "dfadas@gmail.com",
      phone: "0906782973",
    },
    {
      id: 2,
      name: "Tade Adesanya",
      email: "dfadas@gmail.com",
      phone: "0906782973",
    },
    {
      id: 3,
      name: "Tade Adesanya",
      email: "dfadas@gmail.com",
      phone: "0906782973",
    },
  ];

  // Define columns with correct types
  const columns: Column[] = [
    {
      title: "Dispatch Name",
      field: "name",
      // headerStyle: { textAlign: "center" } as React.CSSProperties,
      // cellStyle: { textAlign: "center" } as React.CSSProperties,
      //   render: (rowData) => (
      //     <div className="whitespace-nowrap">{rowData.vehicle_plate_no}</div>
      //   ),
    },
    {
      title: "Email address",
      field: "email",
      // headerStyle: {  textAlign: "center" } as React.CSSProperties,
      // cellStyle: { paddingLeft: "2%" } as React.CSSProperties,
    },
    {
      title: "Phone No",
      field: "phone",
      // headerStyle: {  textAlign: "center" } as React.CSSProperties,
      // cellStyle: { paddingLeft: "2%" } as React.CSSProperties,
      //   render: (rowData) => (
      //     <div className="whitespace-nowrap">{rowData.engine_no}</div>
      //   ),
    },
    {
      title: "Action",
      field: "actions",
      // headerStyle: { textAlign: "center" } as React.CSSProperties,
      // cellStyle: { textAlign: "center" } as React.CSSProperties,
      render: (rowData) => {
        const index = data.findIndex((row) => row.id === rowData.id);

        return (
          <div className="relative">
            <div className="">
              <SlOptions
                className="cursor-pointer"
                onClick={() => toggleDropdown(index)}
              />
            </div>
            {dropdownIndex === index && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-10">
                <ul className="py-1">
                  <li>
                    <div
                      //   onClick={() => handleVehicleStatement(rowData.id)} // Pass vehicle id
                      className="px-4 py-2 text-sm text-primary hover:bg-[#9F9F9F33] text-center cursor-pointer"
                    >
                      View Statement
                    </div>
                  </li>
                  <li>
                    <div
                      //   onClick={() => handleVehicleReport(rowData?.id)}
                      className="px-4 py-2 text-sm text-primary hover:bg-[#9F9F9F33] text-center cursor-pointer"
                    >
                      Edit
                    </div>
                  </li>

                  <li>
                    <div
                      //   onClick={() => handleVehicleDocuments(rowData?.id)}
                      className="px-4 py-2 text-sm text-[#FF4848] hover:bg-[#9F9F9F33] text-center cursor-pointer"
                    >
                      Archive
                    </div>
                  </li>
                </ul>
              </div>
            )}
          </div>
        );
      },
    },
  ];

  const exportToCsv = () => {
    // Fixing the error here by ensuring the `row[col.field]` is typed correctly
    const headers = columns.map((col) => col.title).join(",") + "\n";
    const rows = data
      .map((row) => {
        return columns
          .map((col) => row[col.field as keyof Row]) // Ensure `col.field` is typed as keyof Row
          .join(",");
      })
      .join("\n");

    const csvContent = "data:text/csv;charset=utf-8," + headers + rows;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "table_data.csv");
    document.body.appendChild(link);
    link.click();
  };

  // Define icons
  const icons = {
    Add: forwardRef<SVGSVGElement>((props, ref) => (
      <AddBox {...props} ref={ref} />
    )),
    Check: forwardRef<SVGSVGElement>((props, ref) => (
      <Check {...props} ref={ref} />
    )),
    Clear: forwardRef<SVGSVGElement>((props, ref) => (
      <Clear {...props} ref={ref} />
    )),
    Delete: forwardRef<SVGSVGElement>((props, ref) => (
      <DeleteOutline {...props} ref={ref} />
    )),
    Edit: forwardRef<SVGSVGElement>((props, ref) => (
      <Edit {...props} ref={ref} />
    )),
    Search: forwardRef<SVGSVGElement>((props, ref) => (
      <Search {...props} ref={ref} />
    )),
    Save: forwardRef<SVGSVGElement>((props, ref) => (
      <Save {...props} ref={ref} />
    )), // Add Save icon
  };

  // Add displayName for debugging
  icons.Add.displayName = "AddIcon";
  icons.Check.displayName = "CheckIcon";
  icons.Clear.displayName = "ClearIcon";
  icons.Delete.displayName = "DeleteIcon";
  icons.Edit.displayName = "EditIcon";
  icons.Search.displayName = "SearchIcon";
  icons.Save.displayName = "SaveIcon";

  return (
    <div>
      {/* Table for Desktop */}
      <div className="">
        {/* {parks?.length > 0 ? ( */}
        <MaterialTable
          title=""
          columns={columns}
          data={data}
          icons={icons}
          options={{
            search: true,
            paging: true,
            sorting: true,
            exportAllData: true, // Exports all rows, not just the visible ones
            rowStyle: {
              fontWeight: 300,
              fontSize: "14px",
              alignItems: "center",
            },
            headerStyle: {
              color: "#036E03",
              // fontWeight: 600,
              fontSize: "14px",
              backgroundColor: "#F9FAFB",
              border: 0,
              borderBottom: "1px solid #E8E9ED",
            },
            tableLayout: "fixed",
          }}
          actions={[
            {
              icon: () => <Save />, // Use a function to render the Save icon
              tooltip: "Export to CSV",
              isFreeAction: true,
              onClick: () => exportToCsv(),
            },
          ]}
        />
        {/* ) : (
                <div className="py-10">
                  <div className="flex justify-center">
                    <Image
                      className=""
                      src="/images/dashboard/stars.svg"
                      alt="image"
                      width={40}
                      height={40}
                      priority
                    />
                  </div>
                  <div className="flex justify-center pt-4 text-[#141313] text-[20px] font-[400]">
                    Sorry, No information yet, Add fleet to start
                  </div>
                </div>
              )} */}
      </div>
    </div>
  );
};

export default DispatchOfficerTable;
