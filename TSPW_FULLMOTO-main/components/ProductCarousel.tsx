"use client";

import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
// Importamos los iconos necesarios para flechas y acciones rápidas.
import { Star, ChevronLeft, ChevronRight, Maximize2, ShoppingCart, Eye } from "lucide-react"; 
import { Button } from "@/components/ui/button";
// components/ProductCarousel.tsx
import { useCart } from "../app/contexts/CartContext";


// =========================================================================
// TIPOS Y DATOS (Define la estructura del producto)
// =========================================================================

// Tipo para asegurar que las 'props' que recibe el componente sean correctas.
type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  brand: string;
  rating: number;
  inStock: boolean;
};

// =========================================================================
// SUB-COMPONENTE: CarouselProductCard (Tarjeta Individual)
// =========================================================================

const CarouselProductCard: React.FC<{ product: Product }> = ({ product }) => {
  // 1. Estado para el evento del cursor: Muestra u oculta la ventana emergente de botones.
  const [isHovered, setIsHovered] = useState(false);
  // 2. Estado para el evento de clic: Maneja la expansión de la imagen.
  const [isExpanded, setIsExpanded] = useState(false);

  const { addToCart } = useCart();

  // MANEJO DE EVENTO: Clic en la Imagen (Expandir)
  const handleImageClick = (e: React.MouseEvent) => {
    // Evita que el clic active eventos en el contenedor Link, si los hay.
    e.preventDefault(); 
    // Al hacer clic, se invierte el estado (si estaba cerrado, se abre y viceversa).
    setIsExpanded(!isExpanded);
  };

  // MANEJO DE EVENTO: Clic en Botón (Agregar al Carrito)
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Detiene la navegación del Link
    if (product.inStock) {
      // Lógica de negocio: llama a la función del contexto para añadir el producto.
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.brand,
        inStock: product.inStock,
      });
      alert(`${product.name} agregado al carrito!`);
    } else {
      alert("Producto agotado.");
    }
  };

  return (
    // CONTENEDOR PRINCIPAL: Aquí se manejan los eventos de HOVER (mantener el cursor fijo).
    <div
      className="relative w-[190px] flex-shrink-0 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)} // Evento 1: Cuando el cursor ENTRA, activa el overlay.
      onMouseLeave={() => setIsHovered(false)} // Evento 2: Cuando el cursor SALE, desactiva el overlay.
    >
      <Link
        href={`/catalog/${product.id}`} // Enlace a la página de detalle (Ver producto)
        className={`block p-4 bg-white rounded-xl shadow-lg transition-all duration-500 transform ${
          // Si isExpanded es true, la imagen se posiciona fija y se agranda.
          isExpanded ? "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100] w-96 h-96 p-8" : "hover:shadow-xl"
        }`}
        aria-label={`Ver detalles de ${product.name}`}
      >
        {/* Contenedor de la Imagen */}
        <div className={`relative w-full mb-3 overflow-hidden rounded-lg ${isExpanded ? 'h-full' : 'h-28'}`}>
          <img
            src={product.image}
            alt={product.name}
            // EVENTO DE CLIC EN LA IMAGEN: Llama a la función que alterna el estado de expansión.
            onClick={handleImageClick} 
            className={`object-cover w-full h-full transition-transform duration-300 ${
              isExpanded ? "cursor-zoom-out" : "cursor-zoom-in"
            }`}
          />
          {/* Botón visual para expandir/cerrar (redundante pero útil) */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 text-white bg-black/50 hover:bg-black/70"
            onClick={handleImageClick}
            aria-label={isExpanded ? "Cerrar imagen" : "Expandir imagen"}
          >
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>

        {/* Detalles del Producto (Se ocultan si está expandida) */}
        {!isExpanded && (
          <div className="text-center">
            {/* ... otros detalles de precio, rating, etc. ... */}
            <p className="text-xs text-gray-500 line-clamp-1 mb-1">{product.brand}</p>
            <h3 className="font-semibold text-sm line-clamp-2 mb-1 text-gray-900">
              {product.name}
            </h3>
            {/* ... código para estrellas y precio ... */}
            <p className="text-lg font-bold text-orange-600">${product.price}</p>
          </div>
        )}
      </Link>
      
      {/* ===================================================================
        VENTANA EMERGENTE (OVERLAY DE HOVER)
        Esta se muestra solo si el cursor está sobre la tarjeta (isHovered && !isExpanded)
      =================================================================== */}
      
      {!isExpanded && isHovered && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-xl flex flex-col items-center justify-center p-4 transition-opacity duration-300 z-10">
          <p className="text-white text-center mb-4 font-semibold">Opciones Rápidas</p>
          
          {/* Botón 1: Agregar producto (EVENTO ONCLICK) */}
          <Button
            className="w-full mb-2 bg-orange-600 hover:bg-orange-700 text-white"
            onClick={handleAddToCart} // Evento onClick para la acción de añadir al carrito
            disabled={!product.inStock}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {product.inStock ? "Agregar producto" : "Agotado"}
          </Button>

          {/* Botón 2: Ver producto (Usando Link de Next.js para navegación) */}
          <Link href={`/catalog/${product.id}`} passHref>
            <Button
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800"
              // Usamos stopPropagation para asegurar que este clic solo navegue y no active el handleImageClick de fondo.
              onClick={(e) => e.stopPropagation()} 
            >
              <Eye className="h-4 w-4 mr-2" />
              Ver producto
            </Button>
          </Link>
        </div>
      )}
      
      {/* Capa oscura de fondo para la imagen expandida (solo visible si isExpanded es true) */}
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black/80 z-[99]"
          onClick={() => setIsExpanded(false)} // Permite cerrar haciendo clic fuera de la imagen
        />
      )}
    </div>
  );
};

// =========================================================================
// COMPONENTE PRINCIPAL DEL CARRUSEL (ProductCarousel)
// =========================================================================

interface ProductCarouselProps {
  products: Product[];
  title: string;
}

export const ProductCarousel: React.FC<ProductCarouselProps> = ({ products, title }) => {
  // 1. Inicialización de Embla Carousel: Obtiene la referencia y la API.
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
      align: "start",       // Alinea las diapositivas al inicio
      loop: true,           // El carrusel se repite infinitamente
      slidesToScroll: 6,    // Desplaza 6 imágenes por clic (ajustar según tu diseño)
  });

  // 2. Funciones de Eventos: Mover carrusel
  // useCallback envuelve la función para optimizar su rendimiento.
  
  // Función para la FLECHA IZQUIERDA (Anterior)
  const scrollPrev = useCallback(() => {
    // emblaApi.scrollPrev() es el método de la librería para ir a la diapositiva anterior.
    emblaApi && emblaApi.scrollPrev(); 
  }, [emblaApi]);

  // Función para la FLECHA DERECHA (Siguiente)
  const scrollNext = useCallback(() => {
    // emblaApi.scrollNext() es el método de la librería para ir a la diapositiva siguiente.
    emblaApi && emblaApi.scrollNext(); 
  }, [emblaApi]);
  

  return (
    <section className="py-12 bg-gray-100 relative" aria-labelledby="carousel-heading">
      <div className="container mx-auto px-4">
        <h2 id="carousel-heading" className="text-3xl font-bold mb-6 text-gray-900">
          {title}
        </h2>
        
        <div className="relative">
            {/* 3. Contenedor del Carrosel (referencia para Embla) */}
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex space-x-4">
                    {products.map((product) => (
                        <div key={product.id} className="embla__slide">
                            {/* Renderizamos la tarjeta individual con su lógica de hover/clic */}
                            <CarouselProductCard product={product} />
                        </div>
                    ))}
                </div>
            </div>

            {/* 4. Botones de Navegación (Flechas) */}
            
            {/* Botón Flecha Izquierda (EVENTO ONCLICK) */}
            <Button
                variant="default"
                size="icon"
                onClick={scrollPrev} // Evento onClick que llama a la función de Embla para desplazar a la izquierda.
                className="absolute top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 hover:bg-orange-600 text-white rounded-full shadow-lg z-20 h-10 w-10"
                aria-label="Diapositiva anterior"
            >
                <ChevronLeft className="h-5 w-5" />
            </Button>

            {/* Botón Flecha Derecha (EVENTO ONCLICK) */}
            <Button
                variant="default"
                size="icon"
                onClick={scrollNext} // Evento onClick que llama a la función de Embla para desplazar a la derecha.
                className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 bg-gray-800 hover:bg-orange-600 text-white rounded-full shadow-lg z-20 h-10 w-10"
                aria-label="Diapositiva siguiente"
            >
                <ChevronRight className="h-5 w-5" />
            </Button>

        </div>
      </div>
    </section>
  );
};