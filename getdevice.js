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
    
    // Detailed device detection for mobile devices
    function detectDetailedDeviceModel() {
        // iOS devices detection with model numbers
        if (userAgent.includes("iPhone") || userAgent.includes("iPad") || userAgent.includes("iPod")) {
            vendor = "Apple";
            
            // iPhone model detection
            if (userAgent.includes("iPhone")) {
                deviceModel = "smartphone";
                
                // iPhone model detection based on screen size, OS version, and device metrics
                const screenWidth = window.screen.width;
                const screenHeight = window.screen.height;
                const pixelRatio = window.devicePixelRatio || 1;
                
                // iPhone 15 Series (2023)
                if (userAgent.includes("iPhone OS 17")) {
                    if (screenHeight >= 932 && screenHeight <= 945 && pixelRatio >= 3) {
                        return "iPhone 15 Pro Max (A2904/A2905)";
                    } else if (screenHeight >= 844 && screenHeight <= 852 && pixelRatio >= 3) {
                        return "iPhone 15 Pro (A2901/A2902)";
                    } else if (screenHeight >= 926 && screenHeight <= 930 && pixelRatio >= 2.8) {
                        return "iPhone 15 Plus (A3092/A3093)";
                    } else if (screenHeight >= 844 && screenHeight <= 852 && pixelRatio >= 2.8) {
                        return "iPhone 15 (A3090/A3091)";
                    }
                }
                
                // iPhone 14 Series (2022)
                if (userAgent.includes("iPhone OS 16") || userAgent.includes("iPhone OS 17")) {
                    if (screenHeight >= 932 && pixelRatio >= 3) {
                        return "iPhone 14 Pro Max (A2651/A2884)";
                    } else if (screenHeight >= 844 && screenHeight <= 852 && pixelRatio >= 3) {
                        return "iPhone 14 Pro (A2650/A2883)";
                    } else if (screenHeight >= 926 && pixelRatio >= 2.8) {
                        return "iPhone 14 Plus (A2632/A2882)";
                    } else if (screenHeight >= 844 && screenHeight <= 852 && pixelRatio >= 2.8) {
                        return "iPhone 14 (A2649/A2881)";
                    }
                }
                
                // iPhone 13 Series (2021)
                if (userAgent.includes("iPhone OS 15") || userAgent.includes("iPhone OS 16") || userAgent.includes("iPhone OS 17")) {
                    if (screenHeight >= 926 && pixelRatio >= 2.8) {
                        return "iPhone 13 Pro Max (A2641/A2485)";
                    } else if (screenHeight >= 844 && screenHeight <= 852 && pixelRatio >= 3) {
                        return "iPhone 13 Pro (A2636/A2483)";
                    } else if (screenHeight >= 844 && screenHeight <= 852 && pixelRatio >= 2.8) {
                        return "iPhone 13 (A2633/A2484)";
                    } else if (screenHeight >= 780 && screenHeight <= 812 && pixelRatio >= 2.8) {
                        return "iPhone 13 mini (A2628/A2482)";
                    }
                }
                
                // iPhone 12 Series (2020)
                if (userAgent.includes("iPhone OS 14") || userAgent.includes("iPhone OS 15") || 
                    userAgent.includes("iPhone OS 16") || userAgent.includes("iPhone OS 17")) {
                    if (screenHeight >= 926 && pixelRatio >= 2.8 && userAgent.includes("iPhone OS 14")) {
                        return "iPhone 12 Pro Max (A2342/A2410)";
                    } else if (screenHeight >= 844 && screenHeight <= 852 && pixelRatio >= 3 && 
                               userAgent.includes("iPhone OS 14")) {
                        return "iPhone 12 Pro (A2341/A2406)";
                    } else if (screenHeight >= 844 && screenHeight <= 852 && pixelRatio >= 2.8 && 
                               userAgent.includes("iPhone OS 14")) {
                        return "iPhone 12 (A2172/A2402)";
                    } else if (screenHeight >= 780 && screenHeight <= 812 && pixelRatio >= 2.8 && 
                               userAgent.includes("iPhone OS 14")) {
                        return "iPhone 12 mini (A2176/A2398)";
                    }
                }
                
                // iPhone 11 Series (2019)
                if (userAgent.includes("iPhone OS 13") || userAgent.includes("iPhone OS 14") || 
                    userAgent.includes("iPhone OS 15") || userAgent.includes("iPhone OS 16") || 
                    userAgent.includes("iPhone OS 17")) {
                    if (screenHeight === 896 && pixelRatio === 3) {
                        return "iPhone 11 Pro Max (A2161/A2220)";
                    } else if (screenHeight === 812 && pixelRatio === 3) {
                        return "iPhone 11 Pro (A2160/A2215)";
                    } else if (screenHeight === 896 && pixelRatio === 2) {
                        return "iPhone 11 (A2111/A2223)";
                    }
                }
                
                // iPhone X Series
                if (screenHeight === 812 && pixelRatio === 3 && 
                    (userAgent.includes("iPhone OS 11") || userAgent.includes("iPhone OS 12"))) {
                    return "iPhone X (A1865/A1901)";
                } else if (screenHeight === 896 && pixelRatio === 2) {
                    return "iPhone XR (A1984/A2105)";
                } else if (screenHeight === 812 && pixelRatio === 3 && userAgent.includes("iPhone OS 12")) {
                    return "iPhone XS (A1920/A2097)";
                } else if (screenHeight === 896 && pixelRatio === 3) {
                    return "iPhone XS Max (A1921/A2101)";
                }
                
                // iPhone 8 Series
                if (screenHeight === 667 && pixelRatio === 2) {
                    return "iPhone 8 (A1863/A1905)";
                } else if (screenHeight === 736 && pixelRatio === 3) {
                    return "iPhone 8 Plus (A1864/A1897)";
                }
                
                // iPhone SE
                if (screenHeight === 667 && pixelRatio === 2 && 
                    (userAgent.includes("iPhone OS 15") || userAgent.includes("iPhone OS 16"))) {
                    return "iPhone SE (2022) (A2595/A2596)";
                } else if (screenHeight === 667 && pixelRatio === 2 && userAgent.includes("iPhone OS 13")) {
                    return "iPhone SE (2020) (A2275/A2298)";
                }
                
                // Fallback to generic iPhone
                return "iPhone";
            }
            
            // iPad detection
            if (userAgent.includes("iPad")) {
                deviceModel = "tablet";
                
                if (userAgent.includes("iPad Pro")) {
                    if (screenWidth === 1024 || screenHeight === 1024) {
                        return "iPad Pro 12.9-inch";
                    } else if (screenWidth === 834 || screenHeight === 834) {
                        return "iPad Pro 11-inch";
                    }
                    return "iPad Pro";
                } else if (userAgent.includes("iPad Air")) {
                    return "iPad Air";
                } else if (userAgent.includes("iPad Mini")) {
                    return "iPad Mini";
                }
                
                return "iPad";
            }
            
            // iPod detection
            if (userAgent.includes("iPod")) {
                deviceModel = "smartphone";
                return "iPod Touch";
            }
        }
        
        // Android device detection
        if (userAgent.includes("Android")) {
            deviceModel = "smartphone";
            
            // Samsung detection
            if (userAgent.includes("SM-G") || userAgent.includes("SM-N") || userAgent.includes("SM-A") || 
                userAgent.includes("SM-F") || userAgent.includes("Samsung")) {
                vendor = "Samsung";
                
                // Galaxy S series
                if (userAgent.includes("SM-S918")) {
                    return "Samsung Galaxy S23 Ultra";
                } else if (userAgent.includes("SM-S916")) {
                    return "Samsung Galaxy S23 Plus";
                } else if (userAgent.includes("SM-S911")) {
                    return "Samsung Galaxy S23";
                } else if (userAgent.includes("SM-S908")) {
                    return "Samsung Galaxy S22 Ultra";
                } else if (userAgent.includes("SM-S906")) {
                    return "Samsung Galaxy S22 Plus";
                } else if (userAgent.includes("SM-S901")) {
                    return "Samsung Galaxy S22";
                } else if (userAgent.includes("SM-G998")) {
                    return "Samsung Galaxy S21 Ultra";
                } else if (userAgent.includes("SM-G996")) {
                    return "Samsung Galaxy S21 Plus";
                } else if (userAgent.includes("SM-G991")) {
                    return "Samsung Galaxy S21";
                } else if (userAgent.includes("SM-F936")) {
                    return "Samsung Galaxy Z Fold 4";
                } else if (userAgent.includes("SM-F926")) {
                    return "Samsung Galaxy Z Fold 3";
                } else if (userAgent.includes("SM-F916")) {
                    return "Samsung Galaxy Z Fold 2";
                } else if (userAgent.includes("SM-F900")) {
                    return "Samsung Galaxy Fold";
                } else if (userAgent.includes("SM-F731") || userAgent.includes("SM-F721")) {
                    return "Samsung Galaxy Z Flip 4";
                } else if (userAgent.includes("SM-F711")) {
                    return "Samsung Galaxy Z Flip 3";
                } else if (userAgent.includes("SM-F700")) {
                    return "Samsung Galaxy Z Flip";
                } else if (userAgent.includes("SM-A")) {
                    // Galaxy A series
                    if (userAgent.includes("SM-A546")) {
                        return "Samsung Galaxy A54";
                    } else if (userAgent.includes("SM-A536")) {
                        return "Samsung Galaxy A53";
                    } else if (userAgent.includes("SM-A525")) {
                        return "Samsung Galaxy A52";
                    } else if (userAgent.includes("SM-A515")) {
                        return "Samsung Galaxy A51";
                    } else if (userAgent.includes("SM-A336")) {
                        return "Samsung Galaxy A33";
                    }
                    return "Samsung Galaxy A Series";
                }
                
                return "Samsung Galaxy";
            }
            
            // Xiaomi detection
            if (userAgent.includes("Xiaomi") || userAgent.includes("Redmi") || userAgent.includes("POCO") || 
                userAgent.includes("Mi ")) {
                vendor = "Xiaomi";
                
                // Mi Series
                if (userAgent.includes("Mi 11 Ultra")) {
                    return "Xiaomi Mi 11 Ultra";
                } else if (userAgent.includes("Mi 11 Pro")) {
                    return "Xiaomi Mi 11 Pro";
                } else if (userAgent.includes("Mi 11 Lite")) {
                    return "Xiaomi Mi 11 Lite";
                } else if (userAgent.includes("Mi 11")) {
                    return "Xiaomi Mi 11";
                } else if (userAgent.includes("Mi 10 Ultra")) {
                    return "Xiaomi Mi 10 Ultra";
                } else if (userAgent.includes("Mi 10 Pro")) {
                    return "Xiaomi Mi 10 Pro";
                } else if (userAgent.includes("Mi 10T Pro")) {
                    return "Xiaomi Mi 10T Pro";
                } else if (userAgent.includes("Mi 10T")) {
                    return "Xiaomi Mi 10T";
                } else if (userAgent.includes("Mi 10")) {
                    return "Xiaomi Mi 10";
                } else if (userAgent.includes("Mi 9T Pro")) {
                    return "Xiaomi Mi 9T Pro";
                } else if (userAgent.includes("Mi 9T")) {
                    return "Xiaomi Mi 9T";
                } else if (userAgent.includes("Mi 9 SE")) {
                    return "Xiaomi Mi 9 SE";
                } else if (userAgent.includes("Mi 9")) {
                    return "Xiaomi Mi 9";
                } else if (userAgent.includes("Mi Mix 4")) {
                    return "Xiaomi Mi Mix 4";
                } else if (userAgent.includes("Mi Mix 3")) {
                    return "Xiaomi Mi Mix 3";
                } else if (userAgent.includes("Mi Mix 2S")) {
                    return "Xiaomi Mi Mix 2S";
                } else if (userAgent.includes("Mi Mix 2")) {
                    return "Xiaomi Mi Mix 2";
                } else if (userAgent.includes("Mi Note 10 Pro")) {
                    return "Xiaomi Mi Note 10 Pro";
                } else if (userAgent.includes("Mi Note 10")) {
                    return "Xiaomi Mi Note 10";
                } else if (userAgent.includes("Mi A3")) {
                    return "Xiaomi Mi A3";
                } else if (userAgent.includes("Mi A2")) {
                    return "Xiaomi Mi A2";
                } else if (userAgent.includes("Mi A1")) {
                    return "Xiaomi Mi A1";
                } else if (userAgent.includes("Mi Pad 5")) {
                    deviceModel = "tablet";
                    return "Xiaomi Mi Pad 5";
                } else if (userAgent.includes("Mi Pad 4")) {
                    deviceModel = "tablet";
                    return "Xiaomi Mi Pad 4";
                } else if (userAgent.includes("Mi MIX Alpha")) {
                    return "Xiaomi Mi MIX Alpha";
                }
                
                // Redmi Series
                if (userAgent.includes("Redmi Note 12 Pro+")) {
                    return "Xiaomi Redmi Note 12 Pro+";
                } else if (userAgent.includes("Redmi Note 12 Pro")) {
                    return "Xiaomi Redmi Note 12 Pro";
                } else if (userAgent.includes("Redmi Note 12")) {
                    return "Xiaomi Redmi Note 12";
                } else if (userAgent.includes("Redmi Note 11 Pro+")) {
                    return "Xiaomi Redmi Note 11 Pro+";
                } else if (userAgent.includes("Redmi Note 11 Pro")) {
                    return "Xiaomi Redmi Note 11 Pro";
                } else if (userAgent.includes("Redmi Note 11S")) {
                    return "Xiaomi Redmi Note 11S";
                } else if (userAgent.includes("Redmi Note 11")) {
                    return "Xiaomi Redmi Note 11";
                } else if (userAgent.includes("Redmi 10 Prime")) {
                    return "Xiaomi Redmi 10 Prime";
                } else if (userAgent.includes("Redmi 10")) {
                    return "Xiaomi Redmi 10";
                } else if (userAgent.includes("Redmi 9T")) {
                    return "Xiaomi Redmi 9T";
                } else if (userAgent.includes("Redmi 9C")) {
                    return "Xiaomi Redmi 9C";
                } else if (userAgent.includes("Redmi 9A")) {
                    return "Xiaomi Redmi 9A";
                } else if (userAgent.includes("Redmi 9")) {
                    return "Xiaomi Redmi 9";
                } else if (userAgent.includes("Redmi K40 Pro+")) {
                    return "Xiaomi Redmi K40 Pro+";
                } else if (userAgent.includes("Redmi K40 Pro")) {
                    return "Xiaomi Redmi K40 Pro";
                } else if (userAgent.includes("Redmi K40")) {
                    return "Xiaomi Redmi K40";
                } else if (userAgent.includes("Redmi 12A")) {
                    return "Xiaomi Redmi 12A";
                } else if (userAgent.includes("Redmi 11A")) {
                    return "Xiaomi Redmi 11A";
                } else if (userAgent.includes("Redmi 10A")) {
                    return "Xiaomi Redmi 10A";
                } else if (userAgent.includes("Redmi Note")) {
                    return "Xiaomi Redmi Note Series";
                } else if (userAgent.includes("Redmi")) {
                    return "Xiaomi Redmi Series";
                }
                
                // POCO Series
                if (userAgent.includes("POCO X5 Pro")) {
                    return "Xiaomi POCO X5 Pro";
                } else if (userAgent.includes("POCO X5")) {
                    return "Xiaomi POCO X5";
                } else if (userAgent.includes("POCO F4 GT")) {
                    return "Xiaomi POCO F4 GT";
                } else if (userAgent.includes("POCO F4")) {
                    return "Xiaomi POCO F4";
                } else if (userAgent.includes("POCO M5")) {
                    return "Xiaomi POCO M5";
                } else if (userAgent.includes("POCO M4 Pro")) {
                    return "Xiaomi POCO M4 Pro";
                } else if (userAgent.includes("POCO M3")) {
                    return "Xiaomi POCO M3";
                } else if (userAgent.includes("POCO C40")) {
                    return "Xiaomi POCO C40";
                } else if (userAgent.includes("POCO")) {
                    return "Xiaomi POCO Series";
                }
                
                return "Xiaomi Device";
            }
            
            // Infinix detection
            if (userAgent.includes("Infinix")) {
                vendor = "Infinix";
                
                // Zero Series (Flagship)
                if (userAgent.includes("Zero 30 5G")) {
                    return "Infinix Zero 30 5G";
                } else if (userAgent.includes("Zero 20")) {
                    return "Infinix Zero 20";
                } else if (userAgent.includes("Zero Ultra")) {
                    return "Infinix Zero Ultra";
                } else if (userAgent.includes("Zero 5G")) {
                    return "Infinix Zero 5G";
                } else if (userAgent.includes("Zero 4 Plus")) {
                    return "Infinix Zero 4 Plus";
                } else if (userAgent.includes("Zero 4")) {
                    return "Infinix Zero 4";
                } else if (userAgent.includes("Zero")) {
                    return "Infinix Zero Series";
                }
                
                // Note Series (Mid-Range)
                if (userAgent.includes("Note 30 Pro")) {
                    return "Infinix Note 30 Pro";
                } else if (userAgent.includes("Note 30")) {
                    return "Infinix Note 30";
                } else if (userAgent.includes("Note 12 Pro")) {
                    return "Infinix Note 12 Pro";
                } else if (userAgent.includes("Note 12 5G")) {
                    return "Infinix Note 12 5G";
                } else if (userAgent.includes("Note 12")) {
                    return "Infinix Note 12";
                } else if (userAgent.includes("Note 10 Pro")) {
                    return "Infinix Note 10 Pro";
                } else if (userAgent.includes("Note 10")) {
                    return "Infinix Note 10";
                } else if (userAgent.includes("Note 8")) {
                    return "Infinix Note 8";
                } else if (userAgent.includes("Note 7")) {
                    return "Infinix Note 7";
                } else if (userAgent.includes("Note 6")) {
                    return "Infinix Note 6";
                } else if (userAgent.includes("Note")) {
                    return "Infinix Note Series";
                }
                
                // Hot Series (Entry-Level)
                if (userAgent.includes("Hot 30")) {
                    return "Infinix Hot 30";
                } else if (userAgent.includes("Hot 30i")) {
                    return "Infinix Hot 30i";
                } else if (userAgent.includes("Hot 12 Pro")) {
                    return "Infinix Hot 12 Pro";
                } else if (userAgent.includes("Hot 12")) {
                    return "Infinix Hot 12";
                } else if (userAgent.includes("Hot 11")) {
                    return "Infinix Hot 11";
                } else if (userAgent.includes("Hot 10")) {
                    return "Infinix Hot 10";
                } else if (userAgent.includes("Hot 9")) {
                    return "Infinix Hot 9";
                } else if (userAgent.includes("Hot")) {
                    return "Infinix Hot Series";
                }
                
                // Smart Series (Entry-Level)
                if (userAgent.includes("Smart 7")) {
                    return "Infinix Smart 7";
                } else if (userAgent.includes("Smart 6")) {
                    return "Infinix Smart 6";
                } else if (userAgent.includes("Smart 5")) {
                    return "Infinix Smart 5";
                } else if (userAgent.includes("Smart 4")) {
                    return "Infinix Smart 4";
                } else if (userAgent.includes("Smart")) {
                    return "Infinix Smart Series";
                }
                
                // S Series (Selfie-centric)
                if (userAgent.includes("S5 Pro")) {
                    return "Infinix S5 Pro";
                } else if (userAgent.includes("S5")) {
                    return "Infinix S5";
                } else if (userAgent.includes("S")) {
                    return "Infinix S Series";
                }
                
                // Zero X Series (Limited Edition)
                if (userAgent.includes("Zero X Pro")) {
                    return "Infinix Zero X Pro";
                } else if (userAgent.includes("Zero X Neo")) {
                    return "Infinix Zero X Neo";
                } else if (userAgent.includes("Zero X")) {
                    return "Infinix Zero X Series";
                }
                
                return "Infinix Device";
            }
            
            // Google Pixel detection
            if (userAgent.includes("Pixel")) {
                vendor = "Google";
                
                if (userAgent.includes("Pixel 7 Pro")) {
                    return "Google Pixel 7 Pro";
                } else if (userAgent.includes("Pixel 7")) {
                    return "Google Pixel 7";
                } else if (userAgent.includes("Pixel 6 Pro")) {
                    return "Google Pixel 6 Pro";
                } else if (userAgent.includes("Pixel 6a")) {
                    return "Google Pixel 6a";
                } else if (userAgent.includes("Pixel 6")) {
                    return "Google Pixel 6";
                } else if (userAgent.includes("Pixel 5")) {
                    return "Google Pixel 5";
                } else if (userAgent.includes("Pixel 4a")) {
                    return "Google Pixel 4a";
                } else if (userAgent.includes("Pixel 4 XL")) {
                    return "Google Pixel 4 XL";
                } else if (userAgent.includes("Pixel 4")) {
                    return "Google Pixel 4";
                } else if (userAgent.includes("Pixel 3a XL")) {
                    return "Google Pixel 3a XL";
                } else if (userAgent.includes("Pixel 3a")) {
                    return "Google Pixel 3a";
                } else if (userAgent.includes("Pixel 3 XL")) {
                    return "Google Pixel 3 XL";
                } else if (userAgent.includes("Pixel 3")) {
                    return "Google Pixel 3";
                } else if (userAgent.includes("Pixel 2 XL")) {
                    return "Google Pixel 2 XL";
                } else if (userAgent.includes("Pixel 2")) {
                    return "Google Pixel 2";
                } else if (userAgent.includes("Pixel XL")) {
                    return "Google Pixel XL";
                }
                
                const pixelMatch = userAgent.match(/Pixel (\d+)(?:.*XL)?/);
                if (pixelMatch) {
                    return `Google Pixel ${pixelMatch[1]}`;
                }
                
                return "Google Pixel";
            }
            
            // OnePlus detection
            if (userAgent.includes("OnePlus")) {
                vendor = "OnePlus";
                
                if (userAgent.includes("OnePlus 11")) {
                    return "OnePlus 11";
                } else if (userAgent.includes("OnePlus 10 Pro")) {
                    return "OnePlus 10 Pro";
                } else if (userAgent.includes("OnePlus 10T")) {
                    return "OnePlus 10T";
                } else if (userAgent.includes("OnePlus 9 Pro")) {
                    return "OnePlus 9 Pro";
                } else if (userAgent.includes("OnePlus 9")) {
                    return "OnePlus 9";
                } else if (userAgent.includes("OnePlus 8T")) {
                    return "OnePlus 8T";
                } else if (userAgent.includes("OnePlus 8 Pro")) {
                    return "OnePlus 8 Pro";
                } else if (userAgent.includes("OnePlus 8")) {
                    return "OnePlus 8";
                } else if (userAgent.includes("OnePlus 7T Pro")) {
                    return "OnePlus 7T Pro";
                } else if (userAgent.includes("OnePlus 7T")) {
                    return "OnePlus 7T";
                } else if (userAgent.includes("OnePlus 7 Pro")) {
                    return "OnePlus 7 Pro";
                } else if (userAgent.includes("OnePlus 7")) {
                    return "OnePlus 7";
                } else if (userAgent.includes("OnePlus Nord")) {
                    return "OnePlus Nord";
                }
                
                const onePlusMatch = userAgent.match(/OnePlus (\d+)(?:.*Pro)?/);
                if (onePlusMatch) {
                    return `OnePlus ${onePlusMatch[1]}`;
                }
                
                return "OnePlus Device";
            }
            
            // OPPO detection
            if (userAgent.includes("OPPO")) {
                vendor = "OPPO";
                
                if (userAgent.includes("Find X5 Pro")) {
                    return "OPPO Find X5 Pro";
                } else if (userAgent.includes("Find X5")) {
                    return "OPPO Find X5";
                } else if (userAgent.includes("Find X3 Pro")) {
                    return "OPPO Find X3 Pro";
                } else if (userAgent.includes("Find X3")) {
                    return "OPPO Find X3";
                } else if (userAgent.includes("Find X2 Pro")) {
                    return "OPPO Find X2 Pro";
                } else if (userAgent.includes("Find X2")) {
                    return "OPPO Find X2";
                } else if (userAgent.includes("Reno 8 Pro")) {
                    return "OPPO Reno 8 Pro";
                } else if (userAgent.includes("Reno 8")) {
                    return "OPPO Reno 8";
                } else if (userAgent.includes("Reno 7 Pro")) {
                    return "OPPO Reno 7 Pro";
                } else if (userAgent.includes("Reno 7")) {
                    return "OPPO Reno 7";
                } else if (userAgent.includes("Reno 6 Pro")) {
                    return "OPPO Reno 6 Pro";
                } else if (userAgent.includes("Reno 6")) {
                    return "OPPO Reno 6";
                } else if (userAgent.includes("Reno 5 Pro")) {
                    return "OPPO Reno 5 Pro";
                } else if (userAgent.includes("Reno 5")) {
                    return "OPPO Reno 5";
                }
                
                return "OPPO Device";
            }
            
            // Vivo detection
            if (userAgent.includes("vivo") || userAgent.includes("Vivo")) {
                vendor = "Vivo";
                
                if (userAgent.includes("X80 Pro")) {
                    return "Vivo X80 Pro";
                } else if (userAgent.includes("X80")) {
                    return "Vivo X80";
                } else if (userAgent.includes("X70 Pro+")) {
                    return "Vivo X70 Pro+";
                } else if (userAgent.includes("X70 Pro")) {
                    return "Vivo X70 Pro";
                } else if (userAgent.includes("X70")) {
                    return "Vivo X70";
                } else if (userAgent.includes("V25 Pro")) {
                    return "Vivo V25 Pro";
                } else if (userAgent.includes("V25")) {
                    return "Vivo V25";
                } else if (userAgent.includes("V23 Pro")) {
                    return "Vivo V23 Pro";
                } else if (userAgent.includes("V23")) {
                    return "Vivo V23";
                } else if (userAgent.includes("Y75")) {
                    return "Vivo Y75";
                } else if (userAgent.includes("Y73")) {
                    return "Vivo Y73";
                } else if (userAgent.includes("Y72")) {
                    return "Vivo Y72";
                } else if (userAgent.includes("Y55")) {
                    return "Vivo Y55";
                } else if (userAgent.includes("Y35")) {
                    return "Vivo Y35";
                } else if (userAgent.includes("Y33")) {
                    return "Vivo Y33";
                }
