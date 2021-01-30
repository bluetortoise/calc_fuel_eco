//-----------------------------------
//        CalcFuelEco app.js
//----------------------------------- 

const express = require('express');
const mysql = require('mysql');

const app = express();

//  publicフォルダ内のファイルを読み込めるようにする 
app.use(express.static('public'));

//  フォームの値を受け取るために必要
app.use(express.urlencoded({extended:false}));

// MySQL サーバに接続して データベース名'fuel_eco'を開く
const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password :'gva3vbt4JF!P',
    database: 'fuel_eco'
});

//MySQLへの接続ができていないときにエラーを表示
connection.connect((err)=>{
    if(err){
        console.log('error connecting:' + err.stack);
        return;
    }
    console.log('connecting mysql success');
});


//---  トップ画面 ルーティング  ---
app.get('/', (req, res) =>{
    res.render('top.ejs');
});

//---  /fuel_amount ルーティング  ---
app.get('/fuel_amount', (req, res) =>{
    res.render('fuel_amount.ejs');
});

//---  /create ルーティング  ---
app.post ('/create', (req, res) =>{
    console.log(req.body.refueledMonth);
    console.log(req.body.opeTime);

    //　データベースに追加
    connection.query(
        'INSERT INTO refueling (refueled_month) VALUES (?)',
        [req.body.refueledMonth],
        (error, results) => {
            if(error){
                console.log(error);
            }
        }
    );

    res.redirect('/');
});

app.listen(3000);