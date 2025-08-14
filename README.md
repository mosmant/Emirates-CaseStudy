# Emirates SDET Case Study

Bu proje, Emirates SDET pozisyonu için geliştirilmiş bir case study çözümüdür. Proje, statik JSON dosyasından veri yönetimi yapan bir web uygulaması ve API Gateway içermektedir.

## 🏗️ Mimari

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │  API Gateway    │
│   (HTML/JS)     │◄──►│   (Node.js)     │◄──►│  (Spring Boot)  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                              │                        │
                              ▼                        ▼
                       ┌─────────────────┐    ┌─────────────────┐
                       │  JSON Data      │    │ External        │
                       │  (EKSdetUseCase │    │ Consumers       │
                       │   .json)        │    │                 │
                       └─────────────────┘    └─────────────────┘
```

## 📋 Gereksinimler

### Web Application (Internal Team)
- ✅ JSON dosyasından veri çekme
- ✅ Veri arama ve filtreleme
- ✅ Kayıt silme
- ✅ Kayıt güncelleme (sadece `appOwner` ve `isValid` alanları)

### API Gateway (External Teams)
- ✅ REST API ile veri çekme
- ✅ Circuit Breaker pattern
- ✅ Rate limiting
- ✅ Fallback mekanizması

### Contract Tests
- ✅ API sözleşme testleri
- ✅ Consumer-driven contract testing

## 🚀 Kurulum ve Çalıştırma

### Ön Gereksinimler
- Node.js (v16+)
- Java 17+
- Maven 3.6+

### 1. Backend Kurulumu

```bash
cd backend
npm install
npm start
```

Backend http://localhost:3000 adresinde çalışacaktır.

### 2. Frontend Kurulumu

```bash
cd frontend
# Basit HTTP server ile çalıştırın
python -m http.server 8000
# veya
npx serve .
```

Frontend http://localhost:8000 adresinde çalışacaktır.

### 3. API Gateway Kurulumu

```bash
cd api-gateway
mvn clean install
mvn spring-boot:run
```

API Gateway http://localhost:8080 adresinde çalışacaktır.

## 📚 API Dokümantasyonu

### Backend API Endpoints

#### GET /api/apps
Tüm uygulamaları listeler.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "appName": "appOne",
      "appData": {
        "appPath": "/appSix",
        "appOwner": "ownerOne",
        "isValid": true
      }
    }
  ],
  "count": 1
}
```

#### GET /api/apps/search
Uygulamaları kriterlere göre arar.

**Query Parameters:**
- `appName` (optional): Uygulama adı
- `appOwner` (optional): Sahip adı
- `isValid` (optional): Geçerlilik durumu

#### GET /api/apps/:appName
Belirli bir uygulamayı getirir.

#### PUT /api/apps/:appName
Uygulama bilgilerini günceller.

**Request Body:**
```json
{
  "appOwner": "newOwner",
  "isValid": false
}
```

**Not:** Sadece `appOwner` ve `isValid` alanları güncellenebilir.

#### DELETE /api/apps/:appName
Uygulamayı siler.

### API Gateway Endpoints

API Gateway, backend API'sini proxy olarak kullanır ve aşağıdaki özellikleri ekler:

- **Circuit Breaker**: Servis kesintilerinde fallback
- **Rate Limiting**: API kullanım sınırlaması
- **Retry Logic**: Başarısız isteklerde yeniden deneme

#### GET /api/apps/**
Backend API'sine yönlendirir.

#### GET /fallback/backend
Backend servisi kullanılamadığında fallback response.

## 🧪 Testler

### Backend Tests

```bash
cd backend
npm test
```

### API Gateway Contract Tests

```bash
cd api-gateway
mvn test
```

### Contract Test Generation

```bash
cd api-gateway
mvn spring-cloud-contract:generateStubs
```

## 📊 Veri Yapısı

JSON dosyası aşağıdaki yapıda olmalıdır:

```json
[
  {
    "appName": "appOne",
    "appData": {
      "appPath": "/appSix",
      "appOwner": "ownerOne",
      "isValid": true
    }
  }
]
```

### Alan Kısıtlamaları
- `appName`: **Değiştirilemez** (fixed)
- `appPath`: **Değiştirilemez** (fixed)
- `appOwner`: **Değiştirilebilir** (dynamic)
- `isValid`: **Değiştirilebilir** (dynamic)

## 🎨 Frontend Özellikleri

- **Modern UI**: Responsive tasarım
- **Search & Filter**: Gelişmiş arama ve filtreleme
- **Real-time Updates**: Anlık veri güncellemeleri
- **Modal Dialogs**: Kullanıcı dostu etkileşim
- **Notifications**: İşlem sonuçları için bildirimler

## 🔧 Konfigürasyon

### Backend Konfigürasyonu
- Port: 3000 (değiştirilebilir)
- JSON dosya yolu: `../EKSdetUseCase.json`

### API Gateway Konfigürasyonu
- Port: 8080
- Backend URL: http://localhost:3000
- Circuit Breaker: Resilience4j
- Rate Limiting: Redis (opsiyonel)

## 📈 Monitoring

### Health Checks
- Backend: `GET /health`
- API Gateway: `GET /actuator/health`

### Metrics
- API Gateway: `GET /actuator/metrics`
- Circuit Breaker: `GET /actuator/circuitbreakers`

## 🚨 Hata Yönetimi

### Backend
- 404: Kayıt bulunamadı
- 400: Geçersiz istek
- 500: Sunucu hatası

### API Gateway
- 503: Servis kullanılamıyor (Circuit Breaker)
- 429: Rate limit aşıldı

## 🔒 Güvenlik

- CORS yapılandırması
- Input validation
- Helmet.js güvenlik başlıkları
- Rate limiting

## 📝 Geliştirme Notları

### Case Study Odak Noktaları
1. **Contract Tests**: API'ler arası sözleşme testleri öncelikli
2. **Quality Assurance**: SDET perspektifinden kalite güvencesi
3. **Maintainability**: Kod kalitesi ve sürdürülebilirlik
4. **User Experience**: Kullanıcı dostu arayüz

### Teknik Seçimler
- **Backend**: Node.js + Express (hızlı geliştirme)
- **Frontend**: Vanilla JS (framework bağımsızlığı)
- **API Gateway**: Spring Cloud Gateway (enterprise-grade)
- **Testing**: Jest + Spring Cloud Contract

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje Emirates SDET case study için geliştirilmiştir.

## 👨‍💻 Geliştirici

SDET Candidate - Emirates Case Study 