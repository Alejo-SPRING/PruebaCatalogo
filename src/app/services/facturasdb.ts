export class Facturasdb {

    private facturas: any[];

    public consultarFacturas(): any[]{
        return JSON.parse(localStorage.getItem("facturas"));
    }

    public crearFactura(factura: any): any{
        this.facturas = JSON.parse(localStorage.getItem("facturas"));
        if(this.facturas) {
            this.facturas.push(factura);
        } else {
            this.facturas = [];
            this.facturas.push(factura);
        }
        localStorage.removeItem("facturas");
        localStorage.setItem("facturas", JSON.stringify(this.facturas));
        return factura;
    }

    public consultarPorId(codigo: string): any{
        this.facturas = JSON.parse(localStorage.getItem("facturas"));
        if(this.facturas != null) {
            for(let item of this.facturas){
                if(item.codigo == codigo) {
                    return item;
                }
            }
        } else {
            return null;
        }
    }

}
