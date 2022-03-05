import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import TablePagination from "@mui/material/TablePagination";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DownloadIcon from "@mui/icons-material/Download";
import XLSX from "xlsx";
import { useSelector, useDispatch } from "react-redux";
import { height } from "@mui/system";
import ReactDOMServer from "react-dom/server";
import Pdf from "../PDF/Pdf";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import jsPDF from "jspdf";
import "jspdf-autotable";
import jwt from "jwt-decode";

export default function History() {
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [dense, setDense] = useState(false);
  const [open, setOpen] = useState(false);
  const [consignee, setconsignee] = useState(null);
  const [searching, setsearching] = useState(null);
  const doc = new jsPDF();
  // console.log(data)
  const handleOpen = (x) => {
    setOpen(true);
    // console.log(x);
  };
  const handleClose = () => setOpen(false);
  
  const searchConsignee = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/users/SearchByConsignee", {
        consName: consignee,
      })
      .then((res) => {
        setsearching(res.data);
        handleOpen();
      })
      .catch((err) => console.log(err));
  };

  const DATA = useSelector((state) => {
    return state;
  });
  // console.log(DATA);

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const userName = localStorage.getItem("Login");
  const Names = jwt(userName);
  // console.log(Names.user.Username)
  useEffect(() => {
    axios
      .post("http://localhost:4000/users/history", {
        Username: Names.user.Username,
      })
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);
  
  const ExcelDownload = (x) => {
    // console.log(x.consPic)
    const worksheet = XLSX.utils.json_to_sheet([x]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "downloadsheetnow");
    let buf = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
    XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workbook, `${x.comodities}_${x.consPic}.xlsx`);
  };
  const allExcelData = () => {
    // console.log(data)
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "TML ORDER DETAILS");
    let buf = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
    XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workbook, "AllData.xlsx");
  };
  const searchedDataExcel = (searching) => {
    // console.log(searching)
    const worksheet = XLSX.utils.json_to_sheet(searching);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "TML ORDER SEARCHED DATA"
    );
    let buf = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
    XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workbook, "SerachedData.xlsx");
  };
  const pdfviewer = (x) => {
    // const openWindow = window.open();
    // openWindow.document.write(`<!DOCTYPE>
    //     ${ReactDOMServer.renderToStaticMarkup(<Pdf data={x} />)}`);
    console.log(x);
    doc.autoTable({
      bodyStyles: { minCellWidth: 80 },
      head: [["TML PVT LTD", "DETAILS"]],
      body: [
        ["SHIPPER NAME", `${x.shipName}`],
        ["SHIPPER ADDRESS", `${x.shipAddr}`],
        ["SHIPPER TELEPHONE", `${x.shipTell}`],
        ["SHIPPER EMAIL", `${x.shipEmail}`],
        ["SHIPPER PIC", `${x.shipPic}`],
        ["CONSIGNEE NAME", `${x.consName}`],
        ["CONSIGNEE ADDRESS", `${x.consAddr}`],
        ["CONSIGNEE TELEPHONE", `${x.consTell}`],
        ["CONSIGNEE EMAIL", `${x.consEmail}`],
        ["CONSIGNEE PIC", `${x.consPic}`],
        ["COMMODITY", `${x.comodities}`],
        ["PORT OF LOADING", `${x.port_of_loading}`],
        ["PORT OF DISCHARGE", `${x.port_of_discharge}`],
        ["FINAL DESTINATION", `${x.final_destination}`],
        ["FREIGHT TERMS", `${x.freight_term}`],
        ["VOLUME", `${x.volume}`],
        ["COMPETITOR", `${x.competition}`],
        ["REMARKS", `${x.remark}`],
      ],
    });
    doc.save(`${x.consName}_${x.port_of_discharge}.pdf`);
  };
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1100,
    height: 500,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 54,
    p: 4,
  };

  return (
    <Grid style={{ width: "1450px", height: "500px" }}>
      <Paper sx={{ width: "100%", marginTop: "-27px" }}>
        <Box
          component="form"
          onSubmit={searchConsignee}
          style={{ textAlign: "left", margin: "25px" }}
        >
          <TextField
            id="standard-basic"
            label="Search by Consignee"
            variant="standard"
            style={{ width: "300px", color: "red" }}
            onChange={(e) => {
              setconsignee(e.target.value);
            }}
          />
          <Button type="submit">Submit</Button>
        </Box>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {searching && `your( ${searching.length} ) Result Found `}

              <Button onClick={() => searchedDataExcel(searching)}>
                Download your searched data{" "}
              </Button>
            </Typography>
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2, overflow: "scroll", height: 400 }}
            >
              {searching &&
                searching.map((x) => {
                  return (
                    <div
                    key={x.id}
                      style={{
                        display: "flex",
                        backgroundColor: "#f0eeeb",
                        color: "black",
                        margin: 5,
                        border: "1px solid white",
                        borderRadius: 20,
                        padding: 8,
                        // paddingLeft:10
                      }}
                    >
                      {/* <div>Country</div> */}
                      {/* <div> */}
                      <div>
                        <h4>from country</h4>
                        <p>{x.order_from_country}</p>
                      </div>
                      <div style={{ marginLeft: 20 }}>
                        <h4>Comodities</h4>
                        <p>{x.comodities}</p>
                      </div>
                      <div style={{ marginLeft: 20 }}>
                        <h4>Competition</h4>
                        <p>{x.competition}</p>
                      </div>
                      <div style={{ marginLeft: 20 }}>
                        <h4>Consignee PIC</h4>
                        <p>{x.consPic}</p>
                      </div>
                      <div style={{ marginLeft: 20 }}>
                        <h4>Port Of Discharge</h4>
                        <p>{x.port_of_discharge}</p>
                      </div>
                      <div style={{ marginLeft: 20 }}>
                        <h4>port Of Loading</h4>
                        <p>{x.port_of_loading}</p>
                      </div>
                      <div style={{ marginLeft: 20 }}>
                        <h4>Final Destination</h4>
                        <p>{x.final_destination}</p>
                      </div>

                      <div style={{ marginLeft: 20 }}>
                        {/* <img src="https://img.icons8.com/material/48/000000/ms-excel--v1.png" /> */}
                        <h4>PDF file </h4>
                        <Button
                          onClick={() => pdfviewer(x)}
                          style={{ marginTop: 16 }}
                        >
                          <PictureAsPdfIcon />
                        </Button>
                      </div>
                      {/* </div> */}
                    </div>
                  );
                })}
            </Typography>
          </Box>
        </Modal>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell
                  style={{ color: "white", backgroundColor: "orange" }}
                >
                  country
                </TableCell>
                <TableCell
                  style={{ color: "white", backgroundColor: "orange" }}
                >
                  Shipper Name
                </TableCell>
                <TableCell
                  style={{ color: "white", backgroundColor: "orange" }}
                >
                  Consignee Name
                </TableCell>
                
                <TableCell
                  style={{ color: "white", backgroundColor: "orange" }}
                >
                  Competition
                </TableCell>
                
                <TableCell
                  style={{ color: "white", backgroundColor: "orange" }}
                >
                  Port Of Loading
                </TableCell>
                <TableCell
                  style={{ color: "white", backgroundColor: "orange" }}
                >
                  Port Of Discharge
                </TableCell>
                <TableCell
                  style={{ color: "white", backgroundColor: "orange" }}
                >
                  Final Destination
                </TableCell>
                <TableCell
                  style={{ color: "white", backgroundColor: "orange" }}
                >
                  Comodities
                </TableCell>
                
                {/* <TableCell
                  style={{ color: "white", backgroundColor: "orange" }}
                >
                  Remark
                </TableCell> */}
                <TableCell
                  style={{ color: "white", backgroundColor: "orange" }}
                >
                  Time
                </TableCell>
                <TableCell
                  style={{
                    color: "white",
                    backgroundColor: "orange",
                    display: "flex",
                  }}
                >
                  <Button onClick={() => allExcelData()}>
                    <img src="https://img.icons8.com/material/48/000000/ms-excel--v1.png" />
                    {/* <DownloadIcon /> */}
                  </Button>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{maxHeight:'100px'}}>
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((x) => {
                  return (
                    <TableRow hover key={x.id} style={{ color: "#313332"}}>
                      <TableCell>{x.order_from_country}</TableCell>
                      <TableCell>{x.shipName}</TableCell>
                      <TableCell>{x.consName}</TableCell>
                      <TableCell>{x.competition}</TableCell>
                      <TableCell>{x.port_of_loading}</TableCell>
                      <TableCell>{x.port_of_discharge}</TableCell>
                      <TableCell>{x.final_destination}</TableCell>
                      <TableCell>{x.comodities}</TableCell>
                      {/* <TableCell style={{
                        display: 'block',
                        width: '267px',
                        height: '74px',
                        whiteSpace:'nowrap',
                        overflow:'hidden',
                        textOverflow:'ellipsis'
                        // white-space: nowrap;
                        // overflow: hidden;
                        // text-overflow: ellipsis;
                      }}>
                        {x.remark}
                      </TableCell> */}
                      <TableCell>{x.createdAt}</TableCell>
                      <TableCell>
                        <Button onClick={() => pdfviewer(x)}>
                          <PictureAsPdfIcon />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 14, 20, 50, 80, 100]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Grid>
  );
}
