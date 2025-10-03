
1. **Step-by-step commands (manual setup)**
2. **Ready-to-use Bash script (automated setup)**

---

## **Step-by-Step Installation (Manual)**

### **1. Update system packages**

```bash
sudo apt update && sudo apt upgrade -y
```

---

### **2. Install Java (required for Jenkins)**

```bash
sudo apt install -y openjdk-17-jdk
java -version
```

---

### **3. Install Jenkins**

```bash
# Add Jenkins key and repo
curl -fsSL https://pkg.jenkins.io/debian/jenkins.io-2023.key | sudo tee \
  /usr/share/keyrings/jenkins-keyring.asc > /dev/null

echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] \
  https://pkg.jenkins.io/debian binary/ | sudo tee \
  /etc/apt/sources.list.d/jenkins.list > /dev/null

# Update and install Jenkins
sudo apt update
sudo apt install -y jenkins

# Start and enable Jenkins service
sudo systemctl enable jenkins
sudo systemctl start jenkins
sudo systemctl status jenkins
```

---

### **4. Install Nginx**

```bash
sudo apt install -y nginx
sudo systemctl enable nginx
sudo systemctl start nginx
sudo systemctl status nginx
```

---

### **5. Configure Firewall (if enabled)**

```bash
# Allow OpenSSH (to keep SSH access alive)
sudo ufw allow OpenSSH

# Allow Nginx HTTP
sudo ufw allow 'Nginx Full'

# Allow Jenkins (default port 8080)
sudo ufw allow 8080

# Enable firewall
sudo ufw enable
sudo ufw status
```

---

### **6. Access Jenkins**

* Open browser → `http://<your-ec2-public-ip>:8080`
* Get initial admin password:

  ```bash
  sudo cat /var/lib/jenkins/secrets/initialAdminPassword
  ```

---

## **Automation Script (Bash)**

If you want a single script for **user data** or manual run:

```bash
#!/bin/bash
# Jenkins + Nginx installation script for Ubuntu

echo "### Updating system ###"
sudo apt update && sudo apt upgrade -y

echo "### Installing Java (JDK 17) ###"
sudo apt install -y openjdk-17-jdk

echo "### Adding Jenkins repo and installing Jenkins ###"
curl -fsSL https://pkg.jenkins.io/debian/jenkins.io-2023.key | sudo tee \
  /usr/share/keyrings/jenkins-keyring.asc > /dev/null

echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] \
  https://pkg.jenkins.io/debian binary/ | sudo tee \
  /etc/apt/sources.list.d/jenkins.list > /dev/null

sudo apt update
sudo apt install -y jenkins

echo "### Starting Jenkins service ###"
sudo systemctl enable jenkins
sudo systemctl start jenkins

echo "### Installing Nginx ###"
sudo apt install -y nginx
sudo systemctl enable nginx
sudo systemctl start nginx

echo "### Configuring firewall ###"
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw allow 8080
sudo ufw --force enable

echo "### Installation Complete ###"
echo "Jenkins is running on port 8080"
echo "Get admin password with: sudo cat /var/lib/jenkins/secrets/initialAdminPassword"
```

---

👉 Do you want me to also add **Nginx reverse proxy for Jenkins** (so you can access Jenkins via port 80 with domain/IP, instead of `:8080`)? That way it looks cleaner in production.
