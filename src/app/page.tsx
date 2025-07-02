type Props = {}
const page = (props: Props) => {
  return (
    <>
      <div style={{ padding: "1rem" }}>
        <h3>1. สร้างระบบ Authentication ด้วย NestJS</h3>
        <ul>
          <li>
            <strong>register</strong> <br />
            {`curl -X POST http://localhost:3000/api/auth/register`} <br />
            {`-H "Content-Type: application/json"`} <br />
            {`
              --data-raw '{
                "name": "{name}",
                "email": "{email}",
                "password": "{password}"
              }'`}
          </li>
          <li>
            <strong>login</strong> <br />
            {`curl -X POST http://localhost:3000/api/auth/login`} <br />
            {`-H "Content-Type: application/json"`} <br />
            {`
              --data-raw '{
                "email": "{email}",
                "password": "{password}"
              }'`}
          </li>
          <li>
            <strong>logout</strong> <br />
            {`curl -X GET 'http://localhost:3000/api/auth/logout'`} <br />
            {`-H 'Authorization: {Bearer YOUR_ACCESS_TOKEN_HERE}'`}
          </li>
        </ul>
        <hr />
        <h3>2. สร้าง API สำหรับจัดการสินค้า </h3>
        <ul>
          <li>
            <strong>product insert</strong> <br />
            {`curl -X POST 'http://localhost:3000/api/products/action'`} <br />
            {`--form 'imageupload={file}'`} <br />
            {`--form 'price="{price}"'`} <br />
            {`--form 'name="{name}"'`} <br />
          </li>
          <li>
            <strong>product update</strong> <br />
            {`curl -X PUT 'http://localhost:3000/api/products/action?id={product id}'`} <br />
            {`--form 'imageupload={file}'`} <br />
            {`--form 'price="{price}"'`} <br />
            {`--form 'name="{name}"'`}
          </li>
          <li>
            <strong>get product all</strong> <br />
            {`curl -X GET "http://localhost:3000/api/products/action?find=all"`}
          </li>
          <li>
            <strong>get product id</strong> <br />
            {`curl -X GET "http://localhost:3000/api/products/action?id={product id}"`}
          </li>
          <li>
            <strong>get product delete</strong> <br />
            {`curl -X DELETE "http://localhost:3000/api/products/action?id=all"`}
          </li>
        </ul>

        <hr />
        <h3>3. เพิ่มระบบ Caching ด้วย Redis </h3>
        <ul>
          <li>
            สร้างระบบ Caching สำหรับ API /products โดย: <br />
            1. ใช้ Redis เก็บ Cache ของข้อมูลสินค้าทั้งหมด <br />
            2. เมื่อมีการเพิ่ม/แก้ไข/ลบสินค้า ให้ล้าง Cache ที่เกี่ยวข้อง

          </li>
        </ul>
        <hr />
        <h3>4. ออกแบบระบบจัดการคำสั่งซื้อ</h3>
        <ul>
          <li>
            <strong>orders insert</strong>
            {`curl -POST 'http://localhost:3000/api/orders'`}
            <br />
            {`-H 'Content-Type: application/json'`}
            <br />
            {`--data '{
                "productId": {product id},
                "qty": {qty number},
                "price":{price number}
            }'`}
          </li>
          <li>
            <strong>orders get all</strong> <br />
            {`curl -GET 'http://localhost:3000/api/orders?find=all'`}
          </li>
          <li>
            <strong>orders get id</strong> <br />
            {`curl -GET 'http://localhost:3000/api/orders?id={order id}'`}
          </li>
        </ul>
        <hr />
        <h3>5. ออกแบบชื่อ Endpoint และตั้งชื่อตัวแปรในระบบ</h3>
        <ul>
          <li>
            ออกแบบโครงสร้างชื่อ Endpoint และตัวแปรสำหรับระบบจัดการสินค้า โดย: <br />
            1. ชื่อ Endpoint ต้องเป็น RESTful <br />
            2. ตัวแปรในโค้ดต้องมีความหมายชัดเจน

          </li>
        </ul>
        <hr />
        <h3>6. สร้าง Middleware สำหรับ Logging</h3>
        <ul>
          <li>
            พัฒนา Middleware สำหรับบันทึก Log ทุกครั้งที่มีการเรียกใช้งาน API โดย: <br />
            1. เก็บข้อมูล URL, HTTP Method, และ Response Time ลงในไฟล์ <br />
            2. ใช้ NestJS Middleware
          </li>
        </ul>
        <hr />
        <h3>7. สร้าง Dynamic Module ใน NestJS</h3>
        <ul>
          <li>
            สร้าง Dynamic Module สำหรับการเชื่อมต่อฐานข้อมูล โดย: <br />
            1. รองรับการเชื่อมต่อหลายฐานข้อมูลพร้อมกัน <br />
            2. ใช้ Dynamic Module ของ NestJS

          </li>
        </ul>
        <hr />
        <h3>8. ระบบ Queue Management ด้วย Redis</h3>
        <ul>
          <li>
            สร้างระบบจัดการ Queue ในการส่ง Email โดย: <br />
            1. ใช้ Bull.js + Redis ในการจัดการ Queue <br />
            2. พัฒนา API สำหรับเพิ่มงานเข้า Queue และตรวจสอบสถานะ <br />

            <strong style={{color:"red"}}>หมายเหตุ :</strong> 
            <span>Bull.js ไม่รองรับ next15 จึเปลี่ยนมาใช้ bullmq ซึ่งเป็นเวอร์ชั่นใหม่ของ bull</span>


          </li>
        </ul>
        <hr />
        <h3>9. ออกแบบระบบ Export ข้อมูลเป็นไฟล์ CSV</h3>
        <ul>
          <li>
            curl -X GET 'http://localhost:3000/api/products/export'
          </li>
        </ul>
        <hr />
        <h3>10. เพิ่มระบบ Refresh Token</h3>
        <ul>
          <li>
            พัฒนาระบบ Refresh Token ใน NestJS โดย: <br />
            1. เก็บ Refresh Token ในฐานข้อมูล MySQL <br />
            2. เพิ่ม Endpoint /auth/refresh สำหรับ Refresh Access Token <br />
          </li>
          <li>
            <strong>refresh</strong> <br />
            {`curl -X GET 'http://localhost:3000/api/auth/refresh'`} <br />
            {`-H 'Authorization: {Bearer YOUR_ACCESS_TOKEN_HERE}'`}
          </li>
        </ul>
      </div>
    </>
  )
}


export default page