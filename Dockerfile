# Sử dụng Node.js phiên bản 20.17 trên nền Alpine Linux
FROM node:20.17-alpine3.20

# Thiết lập thư mục làm việc bên trong container
WORKDIR /app

# Sao chép các file package.json và package-lock.json từ máy host vào container
COPY package.json package-lock.json /app/

# Cài đặt dependencies của ứng dụng
RUN npm install

# Sao chép toàn bộ mã nguồn từ máy host vào container
COPY . /app

# Mở cổng 3000 cho ứng dụng
EXPOSE 3000

# Chạy ứng dụng bằng lệnh npm start
CMD ["npm", "start"]
