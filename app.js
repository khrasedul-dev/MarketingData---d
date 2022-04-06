const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://rasedul20:rasedul20@telegramproject.gwtce.mongodb.net/AirdropBotforDiyarbicher',{useNewUrlParser:true,useUnifiedTopology:true}).catch((e)=>{
        console.log(e)
}).then((d)=>console.log('Database connected')).catch((e)=>console.log(e))


const newSchema = new mongoose.Schema({
    
    userId: {
        type: String
    },
    tg_name: {
        type: String
    },
    channel_url: {
        type: String
    },
    sub_count: {
        type: String
    },
    email: {
        type: String
    },
    tg_address: {
        type: String
    },
    promotional_fee:{
        type: String
    },
    smlt_payment: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }


},{versionKey: false})

const User = mongoose.model('marketing_user_list',newSchema)

const app = express();

app.get("/",async (req,res)=>{
    const data = await User.find();
    let htdata = ""
    if(data.length > 0){
        data.map((data)=>{
            htdata = htdata+`
            <tr>
                <td>${data.userId}<td/>
                <td>${data.tg_name}<td/>
                <td>${data.channel_url}<td/>
                <td>${data.sub_count}<td/>
                <td>${data.email}<td/>
                <td>${data.tg_address}<td/>
                <td>${data.promotional_fee}<td/>
                <td>${data.smlt_payment}<td/>
                <td>${data.data}<td/>
            </tr>`
        })
    }

    console.log(data)
    
    const tddata = `<!DOCTYPE html>
    <html>
    <head>
    <style>
    #customers {
      font-family: Arial, Helvetica, sans-serif;
      border-collapse: collapse;
      width: 100%;
    }
    
    #customers td, #customers th {
      border: 1px solid #ddd;
      padding: 8px;
    }
    
    #customers tr:nth-child(even){background-color: #f2f2f2;}
    
    #customers tr:hover {background-color: #ddd;}
    
    #customers th {
      padding-top: 12px;
      padding-bottom: 12px;
      text-align: left;
      background-color: #04AA6D;
      color: white;
    }
    h1{
        text-align:center;
        border-bottom: 1px solid black;
        color: #04AA6D;
    }
    </style>
    </head>
    <body>
    
    <h1 >Marketing information</h1>
    <br><br><br><br>
    
    <table id="customers">
    <tr>
        <th>User Id<th/>
        <th>Name<th/>
        <th>Channel URL<th/>
        <th>Total Subscriber<th/>
        <th>Email<th/>
        <th>Telegram Address<th/>
        <th>Promotional Fee<th/>
        <th>SLMT Payment<th/>
        <th>Join Date<th/>
    </tr>
${htdata}
    </table>
    
    </body>
    </html>`
    res.send(tddata)
    // res.send(data)
});

app.listen(process.env.PORT || 8081,()=>{
    console.log('app is running...')
})