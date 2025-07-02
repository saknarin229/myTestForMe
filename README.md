# 1. สร้างระบบ Authentication ด้วย NestJS
------> register
curl -X POST http://localhost:3000/api/auth/register
-H "Content-Type: application/json"
--data-raw '{ "name": "{name}", "email": "{email}", "password": "{password}" }'

------> login
curl -X POST http://localhost:3000/api/auth/login
-H "Content-Type: application/json"
--data-raw '{ "email": "{email}", "password": "{password}" }'

------> logout
curl -X GET 'http://localhost:3000/api/auth/logout'
-H 'Authorization: {Bearer YOUR_ACCESS_TOKEN_HERE}'


# 2. สร้าง API สำหรับจัดการสินค้า
------> product insert
curl -X POST 'http://localhost:3000/api/products/action'
--form 'imageupload={file}'
--form 'price="{price}"'
--form 'name="{name}"'

------> product update
curl -X PUT 'http://localhost:3000/api/products/action?id={product id}'
--form 'imageupload={file}'
--form 'price="{price}"'
--form 'name="{name}"'

------> get product all
curl -X GET "http://localhost:3000/api/products/action?find=all"
get product id
curl -X GET "http://localhost:3000/api/products/action?id={product id}"
get product delete
curl -X DELETE "http://localhost:3000/api/products/action?id=all"


# 3. เพิ่มระบบ Caching ด้วย Redis
สร้างระบบ Caching สำหรับ API /products โดย:
1. ใช้ Redis เก็บ Cache ของข้อมูลสินค้าทั้งหมด
2. เมื่อมีการเพิ่ม/แก้ไข/ลบสินค้า ให้ล้าง Cache ที่เกี่ยวข้อง


# 4. ออกแบบระบบจัดการคำสั่งซื้อ
orders insertcurl -POST 'http://localhost:3000/api/orders'
-H 'Content-Type: application/json'
--data '{ "productId": {product id}, "qty": {qty number}, "price":{price number} }'
orders get all
curl -GET 'http://localhost:3000/api/orders?find=all'
orders get id
curl -GET 'http://localhost:3000/api/orders?id={order id}'


# 5. ออกแบบชื่อ Endpoint และตั้งชื่อตัวแปรในระบบ
ออกแบบโครงสร้างชื่อ Endpoint และตัวแปรสำหรับระบบจัดการสินค้า โดย:
1. ชื่อ Endpoint ต้องเป็น RESTful
2. ตัวแปรในโค้ดต้องมีความหมายชัดเจน


# 6. สร้าง Middleware สำหรับ Logging
พัฒนา Middleware สำหรับบันทึก Log ทุกครั้งที่มีการเรียกใช้งาน API โดย:
1. เก็บข้อมูล URL, HTTP Method, และ Response Time ลงในไฟล์
2. ใช้ NestJS Middleware


# 7. สร้าง Dynamic Module ใน NestJS
สร้าง Dynamic Module สำหรับการเชื่อมต่อฐานข้อมูล โดย:
1. รองรับการเชื่อมต่อหลายฐานข้อมูลพร้อมกัน
2. ใช้ Dynamic Module ของ NestJS

# 8. ระบบ Queue Management ด้วย Redis
สร้างระบบจัดการ Queue ในการส่ง Email โดย:
1. ใช้ Bull.js + Redis ในการจัดการ Queue
2. พัฒนา API สำหรับเพิ่มงานเข้า Queue และตรวจสอบสถานะ
******* หมายเหตุ :Bull.js ไม่รองรับ next15 จึเปลี่ยนมาใช้ bullmq ซึ่งเป็นเวอร์ชั่นใหม่ของ bull

# 9. ออกแบบระบบ Export ข้อมูลเป็นไฟล์ CSV
curl -X GET 'http://localhost:3000/api/products/export'

# 10. เพิ่มระบบ Refresh Token
พัฒนาระบบ Refresh Token ใน NestJS โดย:
1. เก็บ Refresh Token ในฐานข้อมูล MySQL
2. เพิ่ม Endpoint /auth/refresh สำหรับ Refresh Access Token
refresh
curl -X GET 'http://localhost:3000/api/auth/refresh'
-H 'Authorization: {Bearer YOUR_ACCESS_TOKEN_HERE}'
