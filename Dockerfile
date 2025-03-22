

# 예제: React 앱을 Nginx로 배포하는 경우
FROM node:20 as build
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

# 실제 실행될 Nginx 설정
FROM nginx:1.21
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

