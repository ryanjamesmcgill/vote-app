# Inherit from node stack, app was developed with 4.4.3 but we should test using the latest engine
FROM node:4.4.3

# Download app code
RUN git clone https://github.com/ryanjamesmcgill/vote-app.git /home/vote-app

# install packages
RUN cd /home/vote-app
RUN npm install

# start server
RUN npm run start