# Sohana Front-end Guides
## !!! Lưu ý !!!
### ⚠️ KHÔNG TẢI THÊM BẤT CỨ DEPENDENCY NÀO KHÁC NẾU CHƯA CÓ SỰ CHO PHÉP CỦA TEAM ⚠️
## Nguồn tham khảo
- ~~NextUI~~ HeroUI: https://www.heroui.com/docs
	- (Do mới đổi tên từ NextUI sang HeroUI nên vẫn còn nhiều tài liệu sử dụng `NextUI`, nếu google heroui mà ra heroin thì nên chuyển sang nextui 🤣)
- Tailwind: https://tailwindcss.com/
- Redux Toolkit: https://redux-toolkit.js.org/introduction/getting-started
## How to code
### Router

- Phần router sẽ được handle trong folder `app`
	- **app**
		- `(admin)` (Link rỗng, giả sử `(admin) -> dashboar` thì chỉ cần truy cập `localhost/dashboard`)
		- `some-page` (đường dẫn tới `localhost/some-page`)
			- `[type]` (đường dẫn lấy param, ví dụ `localhost/some-page/apartment` thì sẽ lấy được giá trị của param `type`)
		- `page.tsx` (trang của index)
		- `layout.tsx` (layout chung của toàn bộ web)
- Phần này chỉ được render ở server-side, tuyệt đối không dùng `"use client"` cho các component trong này. Mỗi đường link chỉ nên được chứa 2 ***file*** là `page.tsx` và `layout.tsx`.
- Không được xử lý **dữ liệu** và **thuật toán** ở đây!
### Components
- Phần components sẽ được chia thành 2 phần bên trong folder `components` là `common` (để chứa các file được sử dụng nhiều lần, ưu tiên tính tái sử dụng, tránh bị duplicate code) và `modules` (để chứa các components của các trang được định nghĩa trong folder `app`)
### Kết nối với back-end
- Tạo 1 file mang tên chức năng bên trong folder `store/query`, ví dụ là chức năng quản lý sinh viên sẽ để là `store/query/students.ts` với nội dung:
```typescript
import { propritiesEndpoint } from "@/constants/endpoints";
import { baseApi } from "../base";

export const studentsApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
	}),
});  

export const { useGetPropritiesQuery } =  studentsApi;
```
- Tạo 1 enpoint mới trong `constants/endpoints.ts` và thêm tên enpoint vào export:
```typescript
const studentsEndpoint = {
	GET_ALL_STUDENTS: `${API_PREFIX}/students`, // Đường dẫn back-end cho chức năng get all
};

export {
	studentsEndpoint
};
```
- Thêm chức năng get-all vào query:
```typescript
...
endpoints: (builder) => ({
	// Chức năng get-all
	getAllStudents: builder.query<any, any>({ // Có 2 tính năng là query (fetch api thụ động) và mutation
		query: () => ({
			url: propritiesEndpoint.GET_ALL_STUDENTS, // Đường link đã định nghĩa từ trước
			method: "GET", // Phương thức để fetch api
		}),
	}),
}),
...
export const { useGetAllStudentsQuery } = studentsEndpoint; // Nếu là mutation thì sẽ là use...Mutation
```
- Cách dùng ở module:
	- Dùng cho query (fetch thụ động, dùng cho get hoặc get all)
	```typescript
	const { students, isFetching, isSuccess } =  useGetStudentsQuery(
		null, // tham số truyền vào
		{
			selectFromResult: (result) => ({
				students: result.data, // data trả về
				isFetching: result.isFetching, // trạng thái gọi api
				isSuccess: result.isSuccess,
			}),
		},
	);

	// Sử dụng `students`
	```
	- Dùng cho mutation (fetch chủ động, ưu tiên cho việc update, delete, hoặc get có điều kiện)
	
	```typescript
	const [addStudent, { isFetching, isSuccess }] = useAddStudentMutation();

	// Sử dụng
	const handleSubmit = async(data: Student) => {
		const student = await addStudent(data).unwrap();
		// student là kết quả trả về sau khi fetch api
	}
	```
## Cách làm việc chung
- Push lên Github ở một nhánh riêng
	- Nhánh `docs/...` để update tài liệu
	- Nhánh `feature/...` để thêm mới các tính năng
	- Nhánh `fixbug/...` để sửa các lỗi ở bản development
	- Nhánh `hotfix/...` để sửa lỗi trực tiếp trên production (tạo pull request tới nhánh `master`)
- Tạo pull request tới nhánh `development`
- Check sonar trên PR mới tạo