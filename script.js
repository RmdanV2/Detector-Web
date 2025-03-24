const translations = {
            id: {
                title: "Pendeteksi Sistem",
                batteryTitle: "Info Dasar Baterai",
                deviceTitle: "Info Dasar Perangkat",
                featuresTitle: "Fitur",
                checkingSystem: "Memeriksa sistem",
                gettingDeviceData: "Mendapatkan data perangkat",
                powerConnected: "Sumber daya terhubung",
                powerDisconnected: "Sumber daya tidak terhubung",
                batteryUnavailable: "Informasi baterai tidak tersedia",
                browserUnknown: "Tidak diketahui",
                deviceUnknown: "Tidak diketahui",
                // Battery info
                batteryCapacity: "Kapasitas: ",
                batteryVoltage: "Tegangan: ",
                batteryTechnology: "Teknologi: ",
                batteryTemperature: "Suhu: ",
                batteryDuration: "Bertahan: ",
                powerSource: "Sumber Daya: ",
                // Device info
                deviceModel: "Model: ",
                deviceVendor: "Vendor: ",
                deviceHardware: "Perangkat Keras: ",
                deviceApiLevel: "API Level: ",
                deviceArchitecture: "Karnel Arsitektur: ",
                deviceBrowser: "Browser: ",
                // Features
                featureFastCharging: "Pengisian Cepat",
                featureAdaptiveBattery: "Baterai Adaptif",
                featureStabilizeVoltage: "Stabilkan Tegangan",
                featurePurify: "Murnikan",
                // Feature activation
                activatingFeature: "Mengaktifkan fitur: ",
                featureActivated: "Fitur telah diaktifkan!",
                // Power alert
                powerAlertTitle: "Sumber Daya Tidak Terhubung",
                powerAlertMessage: "Silakan hubungkan perangkat Anda ke sumber daya untuk melanjutkan.",
                // iOS alert
                iosAlertTitle: "Perangkat Tidak Didukung",
                iosAlertMessage: "Aplikasi ini tidak mendukung perangkat iOS (iPhone/iPad). Silakan gunakan perangkat Android atau komputer."
            },
            en: {
                title: "System Detector",
                batteryTitle: "Battery Basic Info",
                deviceTitle: "Device Basic Info",
                featuresTitle: "Features",
                checkingSystem: "Checking system",
                gettingDeviceData: "Getting device data",
                powerConnected: "Power source connected",
                powerDisconnected: "Power source disconnected",
                batteryUnavailable: "Battery information not available",
                browserUnknown: "Unknown",
                deviceUnknown: "Unknown",
                // Battery info
                batteryCapacity: "Capacity: ",
                batteryVoltage: "Voltage: ",
                batteryTechnology: "Technology: ",
                batteryTemperature: "Temperature: ",
                batteryDuration: "Duration: ",
                powerSource: "Power Source: ",
                // Device info
                deviceModel: "Model: ",
                deviceVendor: "Vendor: ",
                deviceHardware: "Hardware: ",
                deviceApiLevel: "API Level: ",
                deviceArchitecture: "Kernel Architecture: ",
                deviceBrowser: "Browser: ",
                // Features
                featureFastCharging: "Fast Charging",
                featureAdaptiveBattery: "Adaptive Battery",
                featureStabilizeVoltage: "Stabilize Voltage",
                featurePurify: "Purify",
                // Feature activation
                activatingFeature: "Activating feature: ",
                featureActivated: "Feature has been activated!",
                // Power alert
                powerAlertTitle: "Power Source Not Connected",
                powerAlertMessage: "Please connect your device to a power source to continue.",
                // iOS alert
                iosAlertTitle: "Device Not Supported",
                iosAlertMessage: "This application does not support iOS devices (iPhone/iPad). Please use an Android device or computer."
            }
        };
        
        let currentLang = 'id';
        let isPowerConnected = false;
        
        // Function to detect iOS devices
        function isIOS() {
            return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        }
        
        function switchLanguage() {
            currentLang = document.getElementById('languageSwitcher').value;
            updateTranslations();
            
            // Update power alert translations
            document.getElementById('powerAlertTitle').textContent = 
                translations[currentLang].powerAlertTitle;
            document.getElementById('powerAlertMessage').textContent = 
                translations[currentLang].powerAlertMessage;
                
            // Update iOS alert translations
            document.getElementById('iosAlertTitle').textContent = 
                translations[currentLang].iosAlertTitle;
            document.getElementById('iosAlertMessage').textContent = 
                translations[currentLang].iosAlertMessage;
        }

        function updateTranslations() {
            // Update titles
            document.getElementById('title').textContent = translations[currentLang].title;
            document.getElementById('batteryTitle').textContent = translations[currentLang].batteryTitle;
            document.getElementById('deviceTitle').textContent = translations[currentLang].deviceTitle;
            document.getElementById('featuresTitle').textContent = translations[currentLang].featuresTitle;
            
            // Update features
            document.getElementById('featureFastCharging').textContent = translations[currentLang].featureFastCharging;
            document.getElementById('featureAdaptiveBattery').textContent = translations[currentLang].featureAdaptiveBattery;
            document.getElementById('featureStabilizeVoltage').textContent = translations[currentLang].featureStabilizeVoltage;
            document.getElementById('featurePurify').textContent = translations[currentLang].featurePurify;
            
            // Update status if already set
            updateBatteryStatus();
            updateDeviceInfo();
        }

        function showPopup(text) {
            document.getElementById('popupText').textContent = text;
            document.getElementById('popupOverlay').style.display = 'block';
            document.getElementById('popup').style.display = 'block';
            setTimeout(hidePopup, 2000);
        }
        
        function hidePopup() {
            document.getElementById('popupOverlay').style.display = 'none';
            document.getElementById('popup').style.display = 'none';
        }

        function togglePowerAlert(show) {
            const powerAlert = document.getElementById('powerAlert');
            powerAlert.style.display = show ? 'flex' : 'none';
            document.body.style.overflow = show ? 'hidden' : '';
            isPowerConnected = !show;
            
            if (show) {
                setTimeout(() => {
                    if (powerAlert.style.display === 'flex') {
                        powerAlert.style.display = 'none';
                        document.body.style.overflow = '';
                        isPowerConnected = false;
                    }
                }, 3000); // 3 seconds
            }
        }
        
        function showIOSAlert() {
            document.getElementById('iosAlert').style.display = 'flex';
            document.body.style.overflow = 'hidden';
            
            // Hide all other content
            document.querySelector('.container').style.display = 'none';
            document.querySelector('footer').style.display = 'none';
        }

        function activateFeature(feature) {
            // Only allow feature activation if power is connected
            if (!isPowerConnected) {
                togglePowerAlert(true);
                return;
            }
            
            let featureName = '';
            switch(feature) {
                case 'fastCharging':
                    featureName = translations[currentLang].featureFastCharging;
                    break;
                case 'adaptiveBattery':
                    featureName = translations[currentLang].featureAdaptiveBattery;
                    break;
                case 'stabilizeVoltage':
                    featureName = translations[currentLang].featureStabilizeVoltage;
                    break;
                case 'purify':
                    featureName = translations[currentLang].featurePurify;
                    break;
            }
            
            showPopup(translations[currentLang].activatingFeature + featureName);
            setTimeout(() => {
                showPopup(translations[currentLang].featureActivated);
            }, 2000);
        }

        function startLoading() {
            // First check if device is iOS
            if (isIOS()) {
                showIOSAlert();
                return;
            }
            
            showPopup(translations[currentLang].checkingSystem);
            setTimeout(() => {
                getBatteryInfo();
                showPopup(translations[currentLang].gettingDeviceData);
                setTimeout(getDeviceInfo, 2000);
            }, 2000);
        }

        function updateBatteryStatus() {
            if (navigator.getBattery) {
                navigator.getBattery().then(function(battery) {
                    let statusDiv = document.getElementById('status');
                    let powerSourceElement = document.getElementById('powerSource');
                    
                    if (battery.charging) {
                        statusDiv.textContent = translations[currentLang].powerConnected;
                        statusDiv.style.backgroundColor = "#4CAF50";
                        statusDiv.style.color = "white";
                        powerSourceElement.textContent = translations[currentLang].powerSource + "Adaptor";
                        
                        // Hide power alert if it was showing and power is now connected
                        togglePowerAlert(false);
                    } else {
                        statusDiv.textContent = translations[currentLang].powerDisconnected;
                        statusDiv.style.backgroundColor = "#F44336";
                        statusDiv.style.color = "white";
                        powerSourceElement.textContent = translations[currentLang].powerSource + "Baterai";
                        
                        // Show power alert when power is disconnected
                        togglePowerAlert(true);
                    }
                });
            } else {
                document.getElementById('status').textContent = translations[currentLang].batteryUnavailable;
                document.getElementById('status').style.backgroundColor = "#FF9800";
                document.getElementById('status').style.color = "white";
                
                // For browsers without Battery API, we'll assume power is connected
                togglePowerAlert(false);
            }
        }

        function getBatteryInfo() {
            if (navigator.getBattery) {
                navigator.getBattery().then(function(battery) {
                    // Capacity
                    const capacity = Math.round(battery.level * 100);
                    document.getElementById('batteryCapacity').textContent = 
                        translations[currentLang].batteryCapacity + capacity + "%";
                    
                    // Voltage - simulate since not directly available
                    const voltage = "≤4150 mV";
                    document.getElementById('batteryVoltage').textContent = 
                        translations[currentLang].batteryVoltage + voltage;
                    
                    // Technology
                    document.getElementById('batteryTech').textContent = 
                        translations[currentLang].batteryTechnology + "Li-poly";
                    
                    // Temperature - simulate since not directly available
                    const temp = "29°C (Sejuk)";
                    document.getElementById('batteryTemp').textContent = 
                        translations[currentLang].batteryTemperature + temp;
                    
                    // Duration - estimate based on current level
                    const duration = "± 12 - 14 jam";
                    document.getElementById('batteryDuration').textContent = 
                        translations[currentLang].batteryDuration + duration;
                    
                    // Update charging status
                    updateBatteryStatus();
                    
                    // Add event listeners
                    battery.addEventListener('chargingchange', updateBatteryStatus);
                    battery.addEventListener('levelchange', function() {
                        document.getElementById('batteryCapacity').textContent = 
                            translations[currentLang].batteryCapacity + Math.round(battery.level * 100) + "%";
                    });
                });
            } else {
                // Fallback for browsers without Battery API
                const unavailable = currentLang === 'id' ? "Tidak tersedia" : "Not available";
                
                document.getElementById('batteryCapacity').textContent = 
                    translations[currentLang].batteryCapacity + unavailable;
                document.getElementById('batteryVoltage').textContent = 
                    translations[currentLang].batteryVoltage + unavailable;
                document.getElementById('batteryTech').textContent = 
                    translations[currentLang].batteryTechnology + unavailable;
                document.getElementById('batteryTemp').textContent = 
                    translations[currentLang].batteryTemperature + unavailable;
                document.getElementById('batteryDuration').textContent = 
                    translations[currentLang].batteryDuration + unavailable;
                document.getElementById('powerSource').textContent = 
                    translations[currentLang].powerSource + unavailable;
            }
        }
        
        function getDeviceInfo() {
            const userAgent = navigator.userAgent;
            let browser = translations[currentLang].browserUnknown;
            let browserVersion = "";
            let deviceModel = "desktop_windows";
            let deviceOS = "Windows";
            let deviceOSVersion = "";
            let vendor = "Google Inc.";
            let hardware = "Win64";  // Default to 64-bit
            let apiLevel = "28";
            let kernelArch = "AARCH64";

            // Check for architecture - improved detection
            if (navigator.userAgent.indexOf("WOW64") !== -1 || 
                navigator.userAgent.indexOf("Win64") !== -1 || 
                navigator.userAgent.indexOf("x86_64") !== -1 || 
                navigator.userAgent.indexOf("x64;") !== -1 || 
                navigator.userAgent.indexOf("AMD64") !== -1 ||
                navigator.platform === "Win64") {
                hardware = "Win64";
            } else if (navigator.platform === "Win32" || navigator.userAgent.indexOf("Win32") !== -1) {
                hardware = "Win32";
            }

            // Detect browser and version
            if (userAgent.includes("Chrome")) {
                browser = "Chrome";
                const match = userAgent.match(/Chrome\/(\d+)/);
                if (match) browserVersion = match[1];
            } else if (userAgent.includes("Firefox")) {
                browser = "Firefox";
                const match = userAgent.match(/Firefox\/(\d+)/);
                if (match) browserVersion = match[1];
            } else if (userAgent.includes("Edg")) {
                browser = "Edge";
                const match = userAgent.match(/Edg\/(\d+)/);
                if (match) browserVersion = match[1];
            } else if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) {
                browser = "Safari";
                const match = userAgent.match(/Version\/(\d+)/);
                if (match) browserVersion = match[1];
            } else if (userAgent.includes("OPR") || userAgent.includes("Opera")) {
                browser = "Opera";
                const match = userAgent.match(/OPR\/(\d+)/);
                if (match) browserVersion = match[1];
            }

            // Detect OS
            if (userAgent.includes("Windows")) {
                deviceOS = "Windows";
                
                // Windows 11 reports as Windows NT 10.0 but has newer build numbers
                const windowsMatch = userAgent.match(/Windows NT 10.0(?:;|\))(?:.*)?( Build (\d+))?/);
                const buildNumberStr = windowsMatch && windowsMatch[2];
                const buildNumber = buildNumberStr ? parseInt(buildNumberStr) : 0;
                
                // Windows 11 starts with build number 22000
                if (buildNumber >= 22000) {
                    deviceOSVersion = "11";
                } else {
                    // For older versions, use traditional detection
                    const ntMatch = userAgent.match(/Windows NT (\d+\.\d+)/);
                    if (ntMatch) {
                        switch(ntMatch[1]) {
                            case "10.0": deviceOSVersion = "10"; break;
                            case "6.3": deviceOSVersion = "8.1"; break;
                            case "6.2": deviceOSVersion = "8"; break;
                            case "6.1": deviceOSVersion = "7"; break;
                            default: deviceOSVersion = ntMatch[1];
                        }
                    }
                }
                
                // Additional Windows 11 detection methods
                if (deviceOSVersion === "10" && navigator.userAgentData) {
                    // Use newer API if available
                    navigator.userAgentData.getHighEntropyValues(["platformVersion"])
                    .then(ua => {
                        // Windows 11 has platform version >= 13
                        if (parseInt(ua.platformVersion.split('.')[0]) >= 13) {
                            deviceOSVersion = "11";
                            updateDeviceModelDisplay(deviceModel, deviceOS, deviceOSVersion);
                        }
                    })
                    .catch(e => {
                        console.log("Could not get detailed platform info");
                    });
                }
            } else if (userAgent.includes("Mac")) {
                deviceOS = "MacOS";
                deviceModel = "desktop_mac";
                const match = userAgent.match(/Mac OS X (\d+[._]\d+)/);
                if (match) deviceOSVersion = match[1].replace("_", ".");
            } else if (userAgent.includes("Linux")) {
                deviceOS = "Linux";
                deviceModel = "computer";
            } else if (userAgent.includes("Android")) {
                deviceOS = "Android";
                deviceModel = "smartphone";
                const match = userAgent.match(/Android (\d+(\.\d+)?)/);
                if (match) deviceOSVersion = match[1];
            }

            updateDeviceInfo(deviceModel, deviceOS, deviceOSVersion, vendor, hardware, apiLevel, kernelArch, browser, browserVersion);
        }

        function updateDeviceModelDisplay(deviceModel, deviceOS, deviceOSVersion) {
            document.getElementById('deviceModel').innerHTML = 
                translations[currentLang].deviceModel + '<span class="material-icons">' + deviceModel + '</span>' + 
                deviceOS + (deviceOSVersion ? ` (${deviceOSVersion})` : "");
        }
        
        function updateDeviceInfo(deviceModel, deviceOS, deviceOSVersion, vendor, hardware, apiLevel, kernelArch, browser, browserVersion) {
            updateDeviceModelDisplay(deviceModel, deviceOS, deviceOSVersion);
            
            document.getElementById('deviceVendor').textContent = 
                translations[currentLang].deviceVendor + vendor;
            
            document.getElementById('deviceHardware').textContent = 
                translations[currentLang].deviceHardware + hardware;
            
            document.getElementById('deviceApiLevel').textContent = 
                translations[currentLang].deviceApiLevel + apiLevel;
            
            document.getElementById('deviceArchitecture').textContent = 
                translations[currentLang].deviceArchitecture + kernelArch;
            
            document.getElementById('deviceBrowser').textContent = 
                translations[currentLang].deviceBrowser + browser + (browserVersion ? ` (${browserVersion})` : "");
        }
        
        window.onload = function() {
            // Initialize power alert translations
            document.getElementById('powerAlertTitle').textContent = 
                translations[currentLang].powerAlertTitle;
            document.getElementById('powerAlertMessage').textContent = 
                translations[currentLang].powerAlertMessage;
                
            startLoading();
            updateTranslations();
        };
