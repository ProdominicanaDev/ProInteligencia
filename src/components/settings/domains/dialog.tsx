import { createProduct, updateProduct } from "@/src/services/products/service";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  Input,
  Spinner,
} from "@material-tailwind/react";
import { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import Product from "@/src/models/product";
import React from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { createDomain } from "@/src/services/domains/service";
const animatedComponents = makeAnimated();

export default function DomainDialog({
 
  open,
  handleOpen,
  updateProducts,
}: {
  open: boolean;
  handleOpen: () => void;
  updateProducts: () => void;
}) {
    const {user, isLoading:userLoading} = useUser();
  const [name, setName] = useState("");
  const [platform, setPlatform] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const platformOptions = [{
    label: "Alerta Comercial",
    value: "alertacomercial"
  },
  {
    label: "Alerta de IED",
    value: "alertaIED"
  }]

 const handleSubmit = async () => {
    if(!isLoading){
        setIsLoading(true);
        const data = {
            name: name,
            platform: platform
        }
        console.log(data)
        await createDomain(data, updateProducts);
        handleOpen();
    }
 }

  return (
    <div>
      <Dialog size="xs" open={open} handler={handleOpen}>
        <DialogHeader>
          Agregar dominio
        </DialogHeader>
        <DialogBody>
          <div className="flex flex-col gap-4">
            <Input
              label="Nombre"
              crossOrigin={""}
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
           <Select
                closeMenuOnSelect={true}
                components={animatedComponents}
                placeholder="Seleccione la plataforma..."
                onChange={ (e:any) => { setPlatform(e.value) } }
                value={platformOptions.find((option) => option.value === platform) || null}
                options={platformOptions}
              />
            <Button
              disabled={isLoading || !name || !platform}
              className="flex items-center justify-center bg-navy"
              onClick={handleSubmit}
            >
              {isLoading ? <Spinner /> : "Guardar"}
            </Button>
          </div>
        </DialogBody>
      </Dialog>
    </div>
  );
}
