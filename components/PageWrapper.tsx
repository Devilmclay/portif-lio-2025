// components/PageWrapper.tsx
"use client"; // Obrigatório, pois usa hooks e interatividade do Framer Motion

import { motion, AnimatePresence } from 'framer-motion';

// Definimos os tipos das props que o componente vai receber
interface PageWrapperProps {
  children: React.ReactNode;
}

export function PageWrapper({ children }: PageWrapperProps) {
  return (
    // AnimatePresence é importante para animações de saída, se as adicionar no futuro.
    <AnimatePresence>
      <motion.div
        // Animação de entrada: começa invisível e um pouco abaixo...
        initial={{ opacity: 0, x: 20 }}
        // ...e anima para totalmente visível na sua posição original.
        animate={{ opacity: 1, x: 0 }}
        // Animação de saída: desaparece ao sair da página.
        exit={{ opacity: 0, x: 20 }}
        // Duração da transição.
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
