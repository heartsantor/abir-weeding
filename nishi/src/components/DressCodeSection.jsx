import { motion } from "framer-motion";

export default function DressCodeSection() {
  return (
    <section className="w-full py-6 md:py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative w-full"
      >
        <img
          src="/assets/dress-code-frame.png"
          alt="Dress Code: Tuscan Garden Black Tie"
          className="w-full h-auto select-none pointer-events-none"
          draggable={false}
        />
      </motion.div>
    </section>
  );
}
