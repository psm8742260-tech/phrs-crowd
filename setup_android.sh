#!/bin/bash
# PHRS Crowd - Android Build Env Setup Script for AI Master Studio

echo "1. సిస్టమ్ అప్డేట్ మరియు టూల్స్ ఇన్స్టాలేషన్..."
sudo apt update && sudo apt install -y openjdk-17-jdk gradle unzip wget

echo "2. ఆండ్రాయిడ్ SDK డైరెక్టరీల ఏర్పాటు..."
mkdir -p $HOME/android-sdk/cmdline-tools
cd $HOME/android-sdk/cmdline-tools

if [ ! -f "commandlinetools-linux-9477386_latest.zip" ]; then
    wget https://dl.google.com/android/repository/commandlinetools-linux-9477386_latest.zip
fi
unzip -o commandlinetools-linux-9477386_latest.zip
[ ! -d "latest" ] && mv cmdline-tools latest
rm -f commandlinetools-linux-9477386_latest.zip

export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
export ANDROID_HOME=$HOME/android-sdk
export PATH=$PATH:$JAVA_HOME/bin:$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools:$ANDROID_HOME/build-tools/33.0.2

echo "3. SDK లైసెన్స్ ఆమోదం..."
yes | $ANDROID_HOME/cmdline-tools/latest/bin/sdkmanager --licenses
$ANDROID_HOME/cmdline-tools/latest/bin/sdkmanager "build-tools;33.0.2" "platforms;android-33" "platform-tools"

echo "4. ఎన్విరాన్మెంట్ వేరియబుల్స్ సెట్టింగ్..."
echo 'export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64' >> ~/.bashrc
echo 'export ANDROID_HOME=$HOME/android-sdk' >> ~/.bashrc
echo 'export PATH=$PATH:$JAVA_HOME/bin:$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools:$ANDROID_HOME/build-tools/33.0.2' >> ~/.bashrc

echo "✓ ఆండ్రాయిడ్ బిల్డ్ ఎన్విరాన్మెంట్ పర్ఫెక్ట్‌గా సెట్ అయింది!"
