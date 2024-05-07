'use strict'

class ProductsFromProvController {
    In_stock(Obj, id)
    {
        for(var i = 0; i < Obj.length; i++)
        {
            if(Obj[i].product_id == id)
            {
                if(Obj[i].available)
                {
                    return true
                }else
                {
                    return false
                }
                break
            }
        }
    }
    Q_missings(Obj, id)
    {
        for(var i = 0; i < Obj.length; i++)
        {
            if(Obj[i].product_id == id)
            {
                return Obj[i].missing
                break
            }
        }
    }
    Check_product(id,Obj)//Check if product exists in the structure
    {
        var index=0
        var aux=0
        for(var i = 0; i < Obj.length; i++)
        {
            if(Obj[i].product_id == id)
            {
                aux++
                index=i
            }
        }
        if(aux==0)
        {
            //Not Found
            return 0
        }else
        {
            //Founded
            return index
        }
    }
    async index({request, response}){
        const Rta={}
        
        var Rta2 = {}
        Rta2["data"]=[]      
        
        Rta.status=200
        Rta.message="Consultar los productos que deben ser alistados por proveedores y a qué proveedor le corresponde cada pedido."
        Rta["order_list"]=[]

        const Order = use("App/Models/Order")
        const OrdersProducts = use("App/Models/OrdersProducts")
        const Product = use("App/Models/Product")
        const Provider = use("App/Models/Provider")
        const Inventory = use("App/Models/Inventory")
        const axios = require('axios');
        
        const orders = await Order.query().orderBy('priority', 'asc').fetch()

        
        for (const order of orders.toJSON()) {
            //console.log("------------------------------")
            //console.log("order id: "+order.id)
            const ordersproducts= await OrdersProducts.query().where('order_id', '=', order.id).fetch()
            for(const op of ordersproducts.toJSON())
            {
                var index=this.Check_product(op.product_id,Rta2.data)     
                if(index!=0)//If product Exists in the structure
                {
                    Rta2.data[index].require = Rta2.data[index].require+op.quantity
                    const inventory = await Inventory.find(op.product_id)
                    if(inventory.quantity>=Rta2.data[index].require)
                    {
                        Rta2.data[index].available = true
                    }else
                    {
                        Rta2.data[index].available = false
                        Rta2.data[index].missing = Rta2.data[index].require-inventory.quantity
                    }
                }else
                {
                    try{
                        const inventory = await Inventory.find(op.product_id)
                        const product = await Product.find(op.product_id)
                        const data={}
                        data.product_id=op.product_id
                        data.name=product.name
                        data.require= op.quantity
                        data.in_stock= inventory.quantity
                        if(data.in_stock>=op.quantity)
                        {
                            data.available = true
                        }else
                        {
                            data.available = false
                            data.missing = op.quantity-inventory.quantity
                        }
                        Rta2.data.push(data)
                    }
                    catch(error)
                    {
                        //console.log(error)
                    }
                }
            }
        }
        //
        for (const order of orders.toJSON()) {
            const order_list={}
            order_list.id=order.id
            const ordersproducts= await OrdersProducts.query().where('order_id', '=', order.id).fetch()
            order_list["data"]=[]
            for(const op of ordersproducts.toJSON())
            {
                //console.log(JSON.parse(uno))
                
                const Inventory = use("App/Models/Inventory")

                const inventory = await Inventory.find(op.product_id)
                const product = await Product.find(op.product_id)
                const data={}
                

                try{
                    const provider = await Provider.find(product.provider_id)
                    
                if(product.provider_id==null)//El producto no tiene proveedor
                {
                    continue
                }

                data.provider_id= product.provider_id
                data.provider_name= provider.name
                data.product_id=op.product_id
                data.product_name=product.name
            }catch(error)
            {
                console.log(error)
            }
                //Se consulta si el producto está en Stock, en caso de que no se agrega a la lista
                if(this.In_stock(Rta2.data, data.product_id)==false)
                {
                    //Se le debe agregar cantidad
                    data.quantity=this.Q_missings(Rta2.data,data.product_id)
                    order_list.data.push(data)
                }
                
                //Rta.data.push(data)
            }
            if(order_list.data.length!=0)//Se omiten ordenes que no deban ser alistadas por proveedores
                Rta.order_list.push(order_list)
            
        }
        return Rta
    }
}

module.exports = ProductsFromProvController
