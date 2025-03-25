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
                iosAlertMessage: "Aplikasi ini tidak mendukung perangkat iOS (iPhone/iPad). Silakan gunakan perangkat Android atau komputer.",
                iosAlertDeviceMessage: "Perangkat Anda: "
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
                iosAlertMessage: "This application does not support iOS devices (iPhone/iPad). Please use an Android device or computer.",
                iosAlertDeviceMessage: "Your Device: "
            }
        };
        
        let currentLang = 'id';
        let isPowerConnected = false;

        // Expanded iOS device detection function
function getIOSDeviceDetails() {
    const userAgent = navigator.userAgent;
    const modelMappings = {
        // iPhone 6S and 6S Plus
        'A1633': { name: 'iPhone 6S (GSM)', series: '6S' },
        'A1688': { name: 'iPhone 6S (CDMA)', series: '6S' },
        'A1699': { name: 'iPhone 6S Plus (GSM)', series: '6S Plus' },
        'A1700': { name: 'iPhone 6S Plus (CDMA)', series: '6S Plus' },
        
        // iPhone SE (1st Generation)
        'A1662': { name: 'iPhone SE (1st Gen, GSM)', series: 'iPhone SE' },
        'A1723': { name: 'iPhone SE (1st Gen, GSM)', series: 'iPhone SE' },
        'A1724': { name: 'iPhone SE (1st Gen, GSM)', series: 'iPhone SE' },
        
        // iPhone 7 and 7 Plus
        'A1660': { name: 'iPhone 7 (GSM/CDMA)', series: 'iPhone 7' },
        'A1778': { name: 'iPhone 7 (GSM)', series: 'iPhone 7' },
        'A1779': { name: 'iPhone 7 Plus (GSM)', series: 'iPhone 7 Plus' },
        'A1780': { name: 'iPhone 7 Plus (GSM)', series: 'iPhone 7 Plus' },
        
        // iPhone 8 and 8 Plus
        'A1863': { name: 'iPhone 8 (GSM/CDMA)', series: 'iPhone 8' },
        'A1905': { name: 'iPhone 8 (GSM)', series: 'iPhone 8' },
        'A1897': { name: 'iPhone 8 Plus (GSM/CDMA)', series: 'iPhone 8 Plus' },
        'A1906': { name: 'iPhone 8 Plus (GSM)', series: 'iPhone 8 Plus' },
        
        // iPhone X
        'A1865': { name: 'iPhone X (GSM)', series: 'iPhone X' },
        'A1901': { name: 'iPhone X (GSM)', series: 'iPhone X' },
        'A1902': { name: 'iPhone X (China)', series: 'iPhone X' },
        
        // iPhone XR
        'A1984': { name: 'iPhone XR (Global)', series: 'iPhone XR' },
        'A2105': { name: 'iPhone XR (China)', series: 'iPhone XR' },
        'A2106': { name: 'iPhone XR (Japan)', series: 'iPhone XR' },
        'A2108': { name: 'iPhone XR (China)', series: 'iPhone XR' },
        
        // iPhone XS and XS Max
        'A1920': { name: 'iPhone XS (Global)', series: 'iPhone XS' },
        'A2097': { name: 'iPhone XS (Japan)', series: 'iPhone XS' },
        'A2098': { name: 'iPhone XS (China)', series: 'iPhone XS' },
        'A1921': { name: 'iPhone XS Max (Global)', series: 'iPhone XS Max' },
        'A2100': { name: 'iPhone XS Max (China)', series: 'iPhone XS Max' },
        
        // iPhone 11, 11 Pro, 11 Pro Max
        'A2111': { name: 'iPhone 11 (Global)', series: 'iPhone 11' },
        'A2221': { name: 'iPhone 11 (China)', series: 'iPhone 11' },
        'A2223': { name: 'iPhone 11 (Japan)', series: 'iPhone 11' },
        'A2160': { name: 'iPhone 11 Pro (Global)', series: 'iPhone 11 Pro' },
        'A2161': { name: 'iPhone 11 Pro (China)', series: 'iPhone 11 Pro' },
        'A2162': { name: 'iPhone 11 Pro (Japan)', series: 'iPhone 11 Pro' },
        'A2161': { name: 'iPhone 11 Pro Max (Global)', series: 'iPhone 11 Pro Max' },
        'A2162': { name: 'iPhone 11 Pro Max (China)', series: 'iPhone 11 Pro Max' },
        
        // iPhone SE (2nd Generation)
        'A2275': { name: 'iPhone SE (2nd Gen, Global)', series: 'iPhone SE' },
        'A2296': { name: 'iPhone SE (2nd Gen, China)', series: 'iPhone SE' },
        'A2298': { name: 'iPhone SE (2nd Gen, Japan)', series: 'iPhone SE' },
        
        // iPhone 12 Series
        'A2176': { name: 'iPhone 12 (Global)', series: 'iPhone 12' },
        'A2403': { name: 'iPhone 12 (China)', series: 'iPhone 12' },
        'A2407': { name: 'iPhone 12 (Japan)', series: 'iPhone 12' },
        'A2410': { name: 'iPhone 12 (Australia)', series: 'iPhone 12' },
        'A2341': { name: 'iPhone 12 Pro (Global)', series: 'iPhone 12 Pro' },
        'A2342': { name: 'iPhone 12 Pro Max (Global)', series: 'iPhone 12 Pro Max' },
        'A2411': { name: 'iPhone 12 Pro Max (China)', series: 'iPhone 12 Pro Max' },
        
        // iPhone 13 Series
        'A2633': { name: 'iPhone 13 (Global)', series: 'iPhone 13' },
        'A2638': { name: 'iPhone 13 (China)', series: 'iPhone 13' },
        'A2628': { name: 'iPhone 13 Mini (Global)', series: 'iPhone 13 Mini' },
        'A2643': { name: 'iPhone 13 Pro (Global)', series: 'iPhone 13 Pro' },
        'A2645': { name: 'iPhone 13 Pro Max (Global)', series: 'iPhone 13 Pro Max' },
        
        // iPhone 14 Series
        'A2649': { name: 'iPhone 14 (Global)', series: 'iPhone 14' },
        'A2632': { name: 'iPhone 14 Plus (Global)', series: 'iPhone 14 Plus' },
        'A2650': { name: 'iPhone 14 Pro (Global)', series: 'iPhone 14 Pro' },
        'A2651': { name: 'iPhone 14 Pro Max (Global)', series: 'iPhone 14 Pro Max' },
        
        // iPhone 15 Series
        'A3091': { name: 'iPhone 15 (Global)', series: 'iPhone 15' },
        'A3092': { name: 'iPhone 15 Plus (Global)', series: 'iPhone 15 Plus' },
        'A3093': { name: 'iPhone 15 Pro (Global)', series: 'iPhone 15 Pro' },
        'A3094': { name: 'iPhone 15 Pro Max (Global)', series: 'iPhone 15 Pro Max' },
        
        // iPhone SE (3rd Generation)
        'A2595': { name: 'iPhone SE (3rd Gen, Global)', series: 'iPhone SE' },
        'A2596': { name: 'iPhone SE (3rd Gen, China)', series: 'iPhone SE' },
        'A2783': { name: 'iPhone SE (3rd Gen, Japan)', series: 'iPhone SE' },
        'A2784': { name: 'iPhone SE (3rd Gen, Global)', series: 'iPhone SE' }
    };

    // Try to get model info from navigator.platform or userAgent
    let deviceModel = 'Unknown iPhone';
    let modelCode = 'N/A';

    // Attempt to extract model code (this part might need adjustment based on actual device detection)
    const modelCodeMatch = userAgent.match(/iPhone(\d+,\d+)/);
    if (modelCodeMatch) {
        modelCode = modelCodeMatch[1];
    }

    // Function to find closest match if exact model code not found
    function findClosestModel(code) {
        const modelKeys = Object.keys(modelMappings);
        return modelKeys.find(key => 
            modelMappings[key].series.toLowerCase().includes(code.toLowerCase())
        ) || modelKeys[0];
    }

    // If navigator.platform exists, try to use it
    if (navigator.platform && navigator.platform.includes('iPhone')) {
        const platformParts = navigator.platform.split(',');
        if (platformParts.length > 1) {
            modelCode = platformParts[1].trim();
        }
    }

    // Find the closest matching model
    const closestModelKey = findClosestModel(modelCode);
    const detectedModel = modelMappings[closestModelKey] || { name: 'Unknown iPhone', series: 'iPhone' };

    return detectedModel;
}

function showIOSAlert() {
    const detectedDevice = getIOSDeviceDetails();
    
    // Update iOS alert message with device details
    document.getElementById('iosAlertDeviceMessage').textContent = 
        translations[currentLang].iosAlertDeviceMessage + detectedDevice.name;
    
    document.getElementById('iosAlert').style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Hide all other content
    document.querySelector('.container').style.display = 'none';
    document.querySelector('footer').style.display = 'none';
}
        
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
