'use client';

import { getCertificate } from '@/services/get-certificate';
import type { Certificate } from '@/types/certificate';
import { useState } from 'react';
import Print from '@/components/ui/certification/Print';
import MessageError from '@/components/ui/certification/MessageError';
import BtnClear from '@/components/ui/certification/BtnClear';
import BtnSearch from '@/components/ui/certification/BtnSearch';

export default function CertificateSearch() {
  const [code, setCode] = useState('');
  const [cert, setCert] = useState<Certificate | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!code.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const data = await getCertificate(code);
      if (!data) {
        setError("El código ingresado no existe o no tiene un certificado asociado.");
      } else {
        setCert(data);
      }
    } catch (err) {
      console.error("Error buscando el certificado", err);
      setError("Ocurrió un error al consultar. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setCode('');
    setCert(null);
    setError(null);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 pt-32 md:pt-48 pb-12">

      <div className="flex gap-2 print:hidden">
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Ej: PWE-123"
          className="border p-3 rounded-md flex-1 min-w-[150px] text-base focus:outline-none focus:ring-1 focus:ring-green-600"
        />
        <BtnSearch handleSearch={handleSearch} loading={loading} />
        {(code || cert) && (
          <BtnClear handleClear={handleClear} />
        )}
      </div>
      {error && (
        <MessageError message={error} />
      )}


      {
        cert && (
          <Print cert={cert} />
        )
      }
    </div >
  );
}
