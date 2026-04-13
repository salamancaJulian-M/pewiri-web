import BtnInstagram from './BtnInstragram';
import BtnWhatsApp from './BtnWhatsApp';
import { getContact } from '@/services/get-contact';
import ProductSlider from './ProductSlider';

interface ProductProps {
  product: {
    name: string;
    description: string;
    price: string;
    images: string[];
  };
}

export default async function ProductDetail({ product }: ProductProps) {
  const contactData = await getContact();
  return (
    <section className="max-w-7xl mx-auto px-4 py-12 md:py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

        {/* --- SECCIÓN DE IMAGEN --- */}
        <div className='w-full'>
          <ProductSlider images={product.images} alt={product.name} />
        </div>

        {/* --- SECCIÓN DE INFORMACIÓN --- */}
        <div className="flex flex-col space-y-6">
          <header className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-stolen text-green-900 leading-tight">
              {product.name}
            </h1>
            <p className="text-2xl font-merriweather text-green-700 font-semibold">
              {product.price}
            </p>
          </header>

          <div className="h-px bg-green-200 w-full" />

          <div className="space-y-4">
            <h3 className="uppercase tracking-widest text-sm font-bold text-green-400">
              Descripción
            </h3>
            <p className="text-green-800 font-merriweather leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* --- BOTONES DE ACCIÓN --- */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <BtnWhatsApp
              number={contactData.number}
              text={`Hola, estoy interesado en la joya: ${product.name}`}
            />
            <BtnInstagram
              text={contactData.instagram}
            />
          </div>

          <p className="text-sm text-green-400 italic">
            * Puedes personalizarlo con la piedra y material que quieras
          </p>
        </div>
      </div>
    </section>
  );
}
