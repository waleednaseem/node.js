import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Pdf from "../PDF/Pdf";
import Button from "@mui/material/Button";
import { useNavigate, Navigate } from "react-router-dom";
import { TextareaAutosize } from "@mui/material";
import TextField from "@mui/material/TextField";
import ReactDOMServer from "react-dom/server";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import jwt from "jwt-decode";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function Dashboard() {
  const doc = new jsPDF();
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
  ];

  const data = useSelector((state) => {
    return state;
  });
  // console.log(data.country)
  const [shipName, setShipName] = useState("");
  const [shipAddr, setShipAddr] = useState("");
  const [shipTell, setShipTell] = useState("");
  const [shipEmail, setShipEmail] = useState("");
  const [shipPic, setShipPic] = useState("");
  const [consName, setConsName] = useState("");
  const [consAddr, setConsAddr] = useState("");
  const [consTell, setConsTell] = useState("");
  const [consEmail, setConsEmail] = useState("");
  const [consPic, setConsPic] = useState("");
  const [competition, setCompetition] = useState("");
  const [volume, setVolume] = useState("");
  const [port_of_loading, setport_of_loading] = useState("");
  const [port_of_discharge, setport_of_discharge] = useState("");
  const [final_destination, setFinal_destination] = useState("");
  const [comodities, setComodities] = useState("");
  const [freight_term, setFreight_term] = useState("");
  const [remark, setRemark] = useState("");
  const [err, seterr] = useState("");
  const [pdfdata, allData] = useState("");
  const [ip, setIp] = useState("");

  const { ConstantValues } = useRef(null);
  const ConstanShipAddr = useRef(null);
  const ConstantshipTell = useRef(null);
  const ConstantshipEmail = useRef(null);
  const ConstantshipPic = useRef(null);
  const ConstantconsAddr = useRef(null);
  const ConstantconsTell = useRef(null);
  const ConstantconsEmail = useRef(null);
  const ConstantconsPic = useRef(null);
  const Constantcompetition = useRef(null);
  const Constantvolume = useRef(null);
  const Constantport_of_loading = useRef(null);
  const Constantport_of_discharge = useRef(null);
  const Constantfinal_destination = useRef(null);
  const ConstantCommodity = useRef(null);
  const Constantfreight = useRef(null);
  const ConstantRemark = useRef(null);
  const ConstanShipName = useRef(null);
  const ConstantconsName = useRef(null);

  const logindata = localStorage.getItem("Login");
  const dataid= jwt(logindata)

  const history = useNavigate();

  const dispatch = useDispatch();
  // const pdfviewer = () => {
  //   // const openWindow = window.open();
  //   // openWindow.document.write(`<!DOCTYPE>
  //   //     ${ReactDOMServer.renderToStaticMarkup(<Pdf data={pdfdata} />)}`);

  // };
  const pdfviewer = () => {
    // const openWindow = window.open();
    // openWindow.document.write(`<!DOCTYPE>
    //     ${ReactDOMServer.renderToStaticMarkup(<Pdf data={x} />)}`);
    // console.log(x);
    doc.autoTable({
      bodyStyles:{minCellWidth: 80},
      head: [["TML PVT LTD", "DETAILS"]],
      body: [
        ["SHIPPER NAME", `${pdfdata.shipName}`],
        ["SHIPPER ADDRESS", `${pdfdata.shipAddr}`],
        ["SHIPPER TELEPHONE", `${pdfdata.shipTell}`],
        ["SHIPPER EMAIL", `${pdfdata.shipEmail}`],
        ["SHIPPER PIC", `${pdfdata.shipPic}`],
        ["CONSIGNEE NAME", `${pdfdata.consName}`],
        ["CONSIGNEE ADDRESS", `${pdfdata.consAddr}`],
        ["CONSIGNEE TELEPHONE", `${pdfdata.consTell}`],
        ["CONSIGNEE EMAIL", `${pdfdata.consEmail}`],
        ["CONSIGNEE PIC", `${pdfdata.consPic}`],
        ["COMMODITY", `${pdfdata.comodities}`],
        ["PORT OF LOADING", `${pdfdata.port_of_loading}`],
        ["PORT OF DISCHARGE", `${pdfdata.port_of_discharge}`],
        ["FINAL DESTINATION", `${pdfdata.final_destination}`],
        ["FREIGHT TERMS", `${pdfdata.freight_term}`],
        ["VOLUME", `${pdfdata.volume}`],
        ["COMPETITOR", `${pdfdata.competition}`],
        ["REMARKS", `${pdfdata.remark}`],
      ]
    }
    // ,{
    //   head: [["REMARK"]],
    //   body:[[]]
    // }
    );
    doc.save(`${pdfdata.consName}_${pdfdata.port_of_discharge}.pdf`);
  };
  // console.log(data.userdata.Username)
  // console.log(dataid.user._id)
  const SendData = (e) => {
    e.preventDefault();
    
    logindata
      ? axios
          .post("http://localhost:4000/users/insertdata", {
            order_from_country: data.country,
            Username: data.userdata.Username,
            shipName: shipName,
            shipAddr: shipAddr,
            shipTell: shipTell,
            shipEmail: shipEmail,
            shipPic: shipPic,
            consName: consName,
            consAddr: consAddr,
            consTell: consTell,
            consEmail: consEmail,
            consPic: consPic,
            competition: competition,
            volume: volume,
            port_of_loading,
            port_of_discharge,
            final_destination,
            comodities: comodities,
            freight_term: freight_term,
            remark: remark,
            User: dataid.user._id,
          })
          .then((res) => {
            res.data.msg === "Data inserted"
              ? toast.success(`${res.data.msg}`)
              : toast.error(`${res.data}`);

            allData(res.data.data);
            ConstanShipAddr.current.value = "";
            ConstantshipTell.current.value = "";
            ConstantshipEmail.current.value = "";
            ConstantshipPic.current.value = "";
            ConstantconsAddr.current.value = "";
            ConstantconsTell.current.value = "";
            ConstantconsEmail.current.value = "";
            ConstantconsPic.current.value = "";
            Constantcompetition.current.value = "";
            Constantvolume.current.value = "";
            Constantport_of_loading.current.value = "";
            Constantport_of_discharge.current.value = "";
            Constantfinal_destination.current.value = "";
            ConstantCommodity.current.value = "";
            Constantfreight.current.value = "";
            ConstantRemark.current.value = "";
            ConstanShipName.current.value = "";
            ConstantconsName.current.value = "";
          })
          .catch((err) => console.log(err))
      : toast.error("Your not logged in", {
          position: "top-center",
          autoClose: 11000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: 0,
        });
  };
  // const clicked=()=>{
  //   // e.setShipPic("");
  //   console.log('clicked')
  // }

  return (
    <div>
      <Grid>
        <Box
          component="form"
          onSubmit={SendData}
          style={{ textAlign: "center", marginTop: "30px" }}
        >
          <div style={{ display: "flex" }}>
            <div>
              <Typography component="h4" variant="h5">
                SHIPPER
              </Typography>

              <TextField
                // inputRef={ConstanShipName}
                variant="standard"
                style={{ margin: "10px" }}
                required
                id="ShipName"
                label="Shipper Name"
                name="ShipName"
                autoComplete="ShipName"
                // Value={shipAddr}
                onChange={(e) => setShipName(e.target.value)}
                autoFocus
              />
              <TextField
                // inputRef={ConstanShipAddr}
                variant="standard"
                style={{ margin: "10px" }}
                required
                id="ShipAddr"
                label="Shipper Address"
                name="ShipAddr"
                autoComplete="ShipAddr"
                // Value={shipAddr}
                onChange={(e) => setShipAddr(e.target.value)}
                autoFocus
              />
              <TextField
                // inputRef={ConstantshipTell}
                style={{ margin: "10px" }}
                variant="standard"
                // margin="normal"
                required
                id="shipTell"
                label="Shipper Tellephone"
                name="shipTell"
                autoComplete="shipTell"
                onChange={(e) => setShipTell(e.target.value)}
                autoFocus
              />
              <TextField
                // inputRef={ConstantshipEmail}
                style={{ margin: "10px" }}
                variant="standard"
                // margin="normal"
                required
                id="shipEmail"
                label="Shipper Email"
                name="shipEmail"
                autoComplete="shipEmail"
                onChange={(e) => setShipEmail(e.target.value)}
                autoFocus
              />
              <TextField
                // inputRef={ConstantshipPic}
                style={{ margin: "10px" }}
                variant="standard"
                // margin="normal"
                required
                id="shipPic"
                label="Shipper PIC"
                name="shipPic"
                autoComplete="shipPic"
                onChange={(e) => setShipPic(e.target.value)}
                autoFocus
              />
            </div>
            <div>
              <Typography component="h4" variant="h5">
                CONSINGEE
              </Typography>
              <TextField
                // inputRef={ConstantconsName}
                style={{ margin: "10px" }}
                variant="standard"
                // margin="normal"
                required
                id="consName"
                label="Consignee Name"
                name="consName"
                autoComplete="consName"
                onChange={(e) => setConsName(e.target.value)}
                autoFocus
              />
              <TextField
                // inputRef={ConstantconsAddr}
                style={{ margin: "10px" }}
                variant="standard"
                // margin="normal"
                required
                id="consAddr"
                label="Consignee address"
                name="consAddr"
                autoComplete="consAddr"
                onChange={(e) => setConsAddr(e.target.value)}
                autoFocus
              />
              <TextField
                // inputRef={ConstantconsTell}
                style={{ margin: "10px" }}
                variant="standard"
                // margin="normal"
                required
                id="consTell"
                label="Consignee Tellephone"
                name="consTell"
                autoComplete="consTell"
                onChange={(e) => setConsTell(e.target.value)}
                autoFocus
              />
              <TextField
                // inputRef={ConstantconsEmail}
                style={{ margin: "10px" }}
                variant="standard"
                // margin="normal"
                required
                id="consEmail"
                label="Consignee Email"
                name="consEmail"
                autoComplete="consEmail"
                onChange={(e) => setConsEmail(e.target.value)}
                autoFocus
              />
              <TextField
                // inputRef={ConstantconsPic}
                style={{ margin: "10px" }}
                variant="standard"
                // margin="normal"
                required
                id="consPic"
                label="Consignee PIC"
                name="consPic"
                autoComplete="consPic"
                onChange={(e) => setConsPic(e.target.value)}
                autoFocus
              />
            </div>
            <div style={{ display: "flex" }}>
              <div>
                <Typography component="h4" variant="h5">
                  OTHER DETAILS
                </Typography>
                <TextField
                  // inputRef={Constantcompetition}
                  style={{ margin: "10px" }}
                  variant="standard"
                  // margin="normal"
                  required
                  id="competition"
                  label="Competition"
                  name="competition"
                  autoComplete="competition"
                  onChange={(e) => setCompetition(e.target.value)}
                  autoFocus
                />
                <TextField
                  // inputRef={Constantvolume}
                  style={{ margin: "10px" }}
                  variant="standard"
                  // margin="normal"
                  required
                  id="volume"
                  label="Volume"
                  name="volume"
                  autoComplete="volume"
                  onChange={(e) => setVolume(e.target.value)}
                  autoFocus
                />
                <TextField
                  // inputRef={Constantport_of_loading}
                  style={{ margin: "10px" }}
                  variant="standard"
                  // margin="normal"
                  required
                  id="port_of_loading"
                  label="Port of loading"
                  name="port_of_loading"
                  autoComplete="port_of_loading"
                  onChange={(e) => setport_of_loading(e.target.value)}
                  autoFocus
                />

                <TextField
                  // inputRef={Constantport_of_discharge}
                  style={{ margin: "10px" }}
                  variant="standard"
                  // margin="normal"
                  required
                  id="port_of_discharge"
                  label="Port of discharge"
                  name="port_of_discharge"
                  autoComplete="port_of_discharge"
                  onChange={(e) => setport_of_discharge(e.target.value)}
                  autoFocus
                />
                <TextField
                  // inputRef={Constantfinal_destination}
                  style={{ margin: "10px" }}
                  variant="standard"
                  // margin="normal"
                  required
                  id="final_destination"
                  label="Final destination"
                  name="final_destination"
                  autoComplete="final_destination"
                  onChange={(e) => setFinal_destination(e.target.value)}
                  autoFocus
                />
                <TextField
                  // inputRef={ConstantCommodity}
                  style={{ margin: "10px" }}
                  variant="standard"
                  // margin="normal"
                  required
                  id="commodity"
                  label="Commodity"
                  name="commodity"
                  autoComplete="commodity"
                  onChange={(e) => setComodities(e.target.value)}
                  autoFocus
                />
                <TextField
                  // inputRef={Constantfreight}
                  style={{ margin: "10px" }}
                  // margin="normal"
                  variant="standard"
                  required
                  id="freight"
                  label="freight terms"
                  name="freight"
                  autoComplete="freight"
                  onChange={(e) => setFreight_term(e.target.value)}
                  autoFocus
                />
                <Typography component="h4" variant="h5" marginTop="5%">
                  Remarks
                </Typography>
                <TextField
                  placeholder="Remark"
                  // variant="standard"
                  // inputRef={ConstantRemark}
                  multiline
                  rows={8}
                  maxRows={10}
                  fullWidth
                  onChange={(e) => setRemark(e.target.value)}
                  autoFocus
                  required
                />
                <br />
                {/* <br /> */}
                <br />
                <Button type="submit" variant="outlined">
                  ORDER
                </Button>
                <Button variant="outlined" onClick={pdfviewer}>
                  PDF
                </Button>
              </div>
            </div>
          </div>
        </Box>
      </Grid>
    </div>
  );
}
