const baseURL = import.meta.env.VITE_WPS_URL;

const parseWPSResponse = async (response: Response) => {
  const text = await response.text();
  const parser = new DOMParser();
  const document = parser.parseFromString(text, "text/xml");
  if (document.getElementsByTagName("ows:Exception").length) {
    throw new Error("Error: " + document.getElementsByTagName("ows:ExceptionText")[0].textContent);
  }
  return document;
};

const WPS = {
  GetCapabilities: async () => {
    const response = await fetch(baseURL + `wps?service=WPS&version=1.0.0&request=GetCapabilities`);
    return parseWPSResponse(response);
  },

  DescribeProcess: async (identifier: string) => {
    const response = await fetch(baseURL + `wps?service=WPS&version=1.0.0&request=DescribeProcess&identifier=${identifier}`);
    return parseWPSResponse(response);
  },

  Execute: async (identifier: string, dataInputs: WPS.LiteralInput[], complexInputs: WPS.ComplexInput[]) => {
    const inputs = [
      ...dataInputs.map(input => `
        <wps:Input>
            <ows:Identifier>${input.identifier}</ows:Identifier>
            <wps:Data>
                <wps:LiteralData>${input.data}</wps:LiteralData>
            </wps:Data>
        </wps:Input>`),
      ...complexInputs.map(input => `
        <wps:Input>
            <ows:Identifier>${input.identifier}</ows:Identifier>
            <wps:Data>
                <wps:ComplexData>${input.data}</wps:ComplexData>
            </wps:Data>
        </wps:Input>`)
    ];

    const response = await fetch(baseURL + `wps`, {
      method: "POST",
      body: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<wps:Execute service="WPS" version="1.0.0" xmlns:wps="http://www.opengis.net/wps/1.0.0" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/wps/1.0.0/wpsExecute_request.xsd">
    <ows:Identifier>${identifier}</ows:Identifier>
    <wps:DataInputs>${inputs.join("")}
    </wps:DataInputs>
</wps:Execute>
`
    });

    return parseWPSResponse(response);
  },
};

const upload = async (formData: FormData) => {
  const response = await fetch(baseURL + "upload", {
    method: "POST",
    body: formData
  });
  return await response.text();
};

export { WPS, upload };
