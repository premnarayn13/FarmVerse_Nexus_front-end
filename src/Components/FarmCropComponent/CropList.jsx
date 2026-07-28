import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCropsByUsername, deleteCropById } from "../../Services/CropService";
import cropBg from "../../assets/images/crop-bg.jpg";
import "../../DisplayView.css";