declare module 'lucide-react/dist/esm/icons/*' {
  import { LucideProps } from 'lucide-react';
  const Icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
  export default Icon;
}
