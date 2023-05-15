# Use the official Node.js 14 image as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the app files to the working directory
COPY . .

# Build the Next.js app
RUN npm run build

# Set the environment variable to production
ENV NODE_ENV=production

# Expose the port on which the Next.js app will run
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "start"]


# ------
# docker build -t nextjs-app .
# docker run -p 3000:3000 --restart=unless-stopped nextjs-app
# docker run -p 3000:3000 --restart=always nextjs-app
# sudo systemctl enable docker
# sudo usermod -aG docker $USER

#  sudo apt update
# sudo apt install apt-transport-https ca-certificates curl software-properties-common
# curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
# echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
# sudo apt update
# sudo apt install docker-ce docker-ce-cli containerd.io
# sudo docker run hello-world


# sudo apt install docker.io

