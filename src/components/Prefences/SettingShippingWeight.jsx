import React from "react";
import { CButton } from "@coreui/react";

const weight = [
  "08.0",
  "08.5",
  "09.0",
  "09.5",
  "10.0",
  "10.5",
  "11.0",
  "11.5",
  "12.0",
];
const num = [18500, 18500, 18500, 18500, 18500, 18500, 18500, 18500, 18500];

const SettingShippingWeight = () => {
  return (
    <div className="container p-0">
      <h5 className="ms-3 mt-3">Preferences - Setting the shipping fee</h5>
      <hr />
      <div className="ms-3 me-3">
        <h5>Shipping area management</h5>
        <div className="mt-5 d-flex justify-content-between">
          <div className="mt-4">
            <h6>Weight (KG)</h6>
            <table>
              <tbody>
                {weight.map((item) => {
                  return (
                    <>
                      <tr>
                        <td>
                          <CButton
                            color="dark"
                            variant="outline"
                            className=" mt-2 pe-5 ps-5 w-100"
                          >
                            {item}
                          </CButton>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div>
            <table>
              <tbody>
                <tr>
                  <td>
                    <CButton
                      color="dark"
                      variant="outline"
                      className=" mt-2 pe-5 ps-5 w-100"
                    >
                      1 Area
                    </CButton>
                  </td>
                </tr>
                {num.map((item) => {
                  return (
                    <>
                      <tr>
                        <td>
                          <CButton
                            color="dark"
                            variant="outline"
                            className=" mt-2 pe-5 ps-5 w-100"
                          >
                            {item}
                          </CButton>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div>
            <table>
              <tbody>
                <tr>
                  <td>
                    <CButton
                      color="dark"
                      variant="outline"
                      className=" mt-2 pe-5 ps-5 w-100"
                    >
                      2 Area
                    </CButton>
                  </td>
                </tr>
                {num.map((item) => {
                  return (
                    <>
                      <tr>
                        <td>
                          <CButton
                            color="dark"
                            variant="outline"
                            className=" mt-2 pe-5 ps-5 w-100"
                          >
                            {item}
                          </CButton>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div>
            <table>
              <tbody>
                <tr>
                  <td>
                    <CButton
                      color="dark"
                      variant="outline"
                      className=" mt-2 pe-5 ps-5 w-100"
                    >
                      3 Area
                    </CButton>
                  </td>
                </tr>
                {num.map((item) => {
                  return (
                    <>
                      <tr>
                        <td>
                          <CButton
                            color="dark"
                            variant="outline"
                            className=" mt-2 pe-5 ps-5 w-100"
                          >
                            {item}
                          </CButton>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div>
            <table>
              <tbody>
                <tr>
                  <td>
                    <CButton
                      color="dark"
                      variant="outline"
                      className=" mt-2 pe-5 ps-5 w-100"
                    >
                      4 Area
                    </CButton>
                  </td>
                </tr>
                {num.map((item) => {
                  return (
                    <>
                      <tr>
                        <td>
                          <CButton
                            color="dark"
                            variant="outline"
                            className=" mt-2 pe-5 ps-5 w-100"
                          >
                            {item}
                          </CButton>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div>
            <table>
              <tbody>
                <tr>
                  <td>
                    <CButton
                      color="dark"
                      variant="outline"
                      className=" mt-2 pe-5 ps-5 w-100"
                    >
                      5 Area
                    </CButton>
                  </td>
                </tr>
                {num.map((item) => {
                  return (
                    <>
                      <tr>
                        <td>
                          <CButton
                            color="dark"
                            variant="outline"
                            className=" mt-2 pe-5 ps-5 w-100"
                          >
                            {item}
                          </CButton>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingShippingWeight;
