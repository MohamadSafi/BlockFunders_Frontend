import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="flex h-screen w-screen items-center place-content-center bg-violet-600">
      <BarLoader />
    </div>
  );
};
const variants = {
  initial: {
    scaleY: 0.5,
    opacity: 0,
  },
  animate: {
    scaleY: 1,
    opacity: 1,
    transition: {
      repeat: Infinity,
      repeatType: "mirror",
      duration: 1,
      ease: "circIn",
    },
  },
};

const BarLoader = () => {
  return (
    <motion.div
      transition={{
        staggerChildren: 0.25,
      }}
      initial="initial"
      animate="animate"
      className="flex gap-1"
    >
      <motion.div variants={variants} className="h-12 w-2 bg-[#4598dc]" />
      <motion.div variants={variants} className="h-12 w-2 bg-[#4598dc]" />
      <motion.div variants={variants} className="h-12 w-2 bg-[#4598dc]" />
      <motion.div variants={variants} className="h-12 w-2 bg-[#4598dc]" />
      <motion.div variants={variants} className="h-12 w-2 bg-[#4598dc]" />
    </motion.div>
  );
};

export default Loader;
