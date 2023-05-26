import { MongoMemoryServer } from 'mongodb-memory-server';
// thư viện MongoMemoryServer tạo một bản sao mogoDB trong bộ nhớ, dành cho test. Sẽ không ảnh hưởng đến DB chính
import mongoose from 'mongoose';



let mongo: any
// beforeAll: Chạy chức năng này trước khi bất kỳ thử nghiệm nào được chạy
beforeAll(async () => {
    process.env.JWT_KEY = 'bY_mat'
    mongo = await MongoMemoryServer.create();
    const mongoUrl = await mongo.getUri();
    await mongoose.connect(mongoUrl)
})

//beforeEach Chạy một chức năng trước khi mỗi bài kiểm tra trong tệp này chạy. Nếu hàm trả về một promise hoặc là một generator, thì Jest đợi promise đó giải quyết trước khi chạy thử nghiệm.
beforeEach(async () => {
    // Lấy tất cả các collection trong cơ sở dữ liệu MongoDB thông qua kết nối Mongoose.
    const collections = await mongoose.connection.db.collections()
    // Duyệt qua từng collection và xóa tất cả các document trong collection đó bằng phương thức deleteMany
    for(let collection of collections){
        await collection.deleteMany({})
    }
})


afterAll(async () => {
    await mongo.stop()
    await mongoose.connection.close()
})
