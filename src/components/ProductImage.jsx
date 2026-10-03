import { useState } from 'react';

// Resuelve rutas locales ("images/x.jpg" o "/images/x.jpg") contra la base de Vite,
// para que funcionen tanto en desarrollo como en GitHub Pages (/catalogo_comparaciones/).
function resolveImage(src) {
  if (!src || /^(https?:)?\/\//.test(src) || src.startsWith('data:')) return src;
  return import.meta.env.BASE_URL + src.replace(/^\/+/, '');
}

export default function ProductImage({ product, className = '' }) {
  const [failed, setFailed] = useState(false);
  if (!product.image || failed) {
    return <span className="text-slate-500 text-sm text-center">Fotografía pendiente de verificar<br />{product.name}</span>;
  }
  return <img src={resolveImage(product.image)} alt={product.name} loading="lazy" decoding="async" className={className} onError={() => setFailed(true)} />;
}
