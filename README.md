<h1> แบบทดสอบ Backend Developer </h1><br>
ศักนรินทร์ ถิ่นสพุง (เล็ก)

# 1. สร้างระบบ Authentication ด้วย NestJS
register <br>
curl -X POST http://localhost:3000/api/auth/register <br>
-H "Content-Type: application/json" <br>
--data-raw '{ <br>
  "name": "{name}", <br>
  "email": "{email}",
  "password": "{password}" <br>
}' <br>

login <br>
curl -X POST http://localhost:3000/api/auth/login <br>
-H "Content-Type: application/json" <br>
--data-raw '{<br>
  "email": "{email}", <br>
  "password": {password}" <br>
}' <br>

logout <br>
curl -X GET 'http://localhost:3000/api/auth/logout' <br>
-H 'Authorization: {Bearer YOUR_ACCESS_TOKEN_HERE}' <br>


# 2. สร้าง API สำหรับจัดการสินค้า
product insert <br>
curl -X POST 'http://localhost:3000/api/products/action' <br>
--form 'imageupload={file}' <br>
--form 'price="{price}"' <br>
--form 'name="{name}"' <br>

------> product update
curl -X PUT 'http://localhost:3000/api/products/action?id={product id}'
--form 'imageupload={file}'
--form 'price="{price}"'
--form 'name="{name}"'

get product all <br>
curl -X GET "http://localhost:3000/api/products/action?find=all" <br>
get product id <br>
curl -X GET "http://localhost:3000/api/products/action?id={product id}" <br>
get product delete <br>
curl -X DELETE "http://localhost:3000/api/products/action?id=all" <br>


# 3. เพิ่มระบบ Caching ด้วย Redis
สร้างระบบ Caching สำหรับ API /products โดย: <br>
1. ใช้ Redis เก็บ Cache ของข้อมูลสินค้าทั้งหมด <br>
2. เมื่อมีการเพิ่ม/แก้ไข/ลบสินค้า ให้ล้าง Cache ที่เกี่ยวข้อง <br>


# 4. ออกแบบระบบจัดการคำสั่งซื้อ
orders insertcurl -POST 'http://localhost:3000/api/orders' <br>
-H 'Content-Type: application/json' <br>
--data '{ <br>
  "productId": {product id}, <br>
  "qty": {qty number}, <br>
  "price":{price number} <br>
}' <br>

orders get all <br>
curl -GET 'http://localhost:3000/api/orders?find=all' <br>
orders get id <br>
curl -GET 'http://localhost:3000/api/orders?id={order id}' <br>


# 5. ออกแบบชื่อ Endpoint และตั้งชื่อตัวแปรในระบบ 
ออกแบบโครงสร้างชื่อ Endpoint และตัวแปรสำหรับระบบจัดการสินค้า โดย: <br>
1. ชื่อ Endpoint ต้องเป็น RESTful <br>
2. ตัวแปรในโค้ดต้องมีความหมายชัดเจน <br>


# 6. สร้าง Middleware สำหรับ Logging
พัฒนา Middleware สำหรับบันทึก Log ทุกครั้งที่มีการเรียกใช้งาน API โดย: <br>
1. เก็บข้อมูล URL, HTTP Method, และ Response Time ลงในไฟล์ <br>
2. ใช้ NestJS Middleware <br>


# 7. สร้าง Dynamic Module ใน NestJS 
สร้าง Dynamic Module สำหรับการเชื่อมต่อฐานข้อมูล โดย: <br>
1. รองรับการเชื่อมต่อหลายฐานข้อมูลพร้อมกัน <br>
2. ใช้ Dynamic Module ของ NestJS <br>

# 8. ระบบ Queue Management ด้วย Redis
สร้างระบบจัดการ Queue ในการส่ง Email โดย: <br>
1. ใช้ Bull.js + Redis ในการจัดการ Queue <br>
2. พัฒนา API สำหรับเพิ่มงานเข้า Queue และตรวจสอบสถานะ <br>
******* หมายเหตุ :Bull.js ไม่รองรับ next15 จึเปลี่ยนมาใช้ bullmq ซึ่งเป็นเวอร์ชั่นใหม่ของ bull <br>

# 9. ออกแบบระบบ Export ข้อมูลเป็นไฟล์ CSV
curl -X GET 'http://localhost:3000/api/products/export' <br>

# 10. เพิ่มระบบ Refresh Token
พัฒนาระบบ Refresh Token ใน NestJS โดย: <br>
1. เก็บ Refresh Token ในฐานข้อมูล MySQL <br>
2. เพิ่ม Endpoint /auth/refresh สำหรับ Refresh Access Token <br>
refresh <br>
curl -X GET 'http://localhost:3000/api/auth/refresh' <br>

-H 'Authorization: {Bearer YOUR_ACCESS_TOKEN_HERE}'
