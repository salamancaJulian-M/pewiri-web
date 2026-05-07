import type { Certificate } from "@/types/certificate";
import CertImages from "./CertImages";
import BtnPrint from "./BtnPrint";

export default function Print({ cert }: { cert: Certificate }) {
  return (
    <div id="certificate-to-print" className="mt-8 border rounded-lg p-8 shadow-lg print:shadow-none print:border-none print:mt-0 print:p-0 print:fixed print:top-0 print:left-0 print:w-full print:bg-white print:z-[9999]">
      <h2 className="text-2xl font-bold border-b pb-2 mb-6 text-green-800">
        Certificado de Autenticidad
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 print:max-w-110">
        <div>
          <p className="text-xs uppercase tracking-wider text-green-300 font-semibold">COD</p>
          <p className="font-mono font-bold text-lg">{cert.cod}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider text-green-300 font-semibold">Tipo</p>
          <p >{cert.type}</p>
        </div>
        <div className="col-span-2">
          <p className="text-xs uppercase tracking-wider text-green-300 font-semibold">Descripción</p>
          <p >{cert.description}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider text-green-300 font-semibold">Cliente</p>
          <p >{cert.customer}</p>
        </div>
      </div>

      {cert.images.length > 0 && (
        <CertImages cert={cert} />
      )}

      <div className="mt-10 flex justify-end border-t pt-6 print:hidden">
        <BtnPrint />
      </div>
    </div>
  )
}
