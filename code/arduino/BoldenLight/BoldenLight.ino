// Dark, off = 0.05
// Dark, off, door open = 0.15
// Dark, on = 1.0
// Light, off = ?
// Light, on = 1.0

void setup() {
  Serial.begin(9600);
  pinMode(13, OUTPUT);
}

void loop() {
  
  int sensorValue = analogRead(A0);
  
  float voltage = sensorValue / 1023.0;
  Serial.println(voltage);
  
  if(voltage > 0.9) {
    digitalWrite(13, HIGH);
    delay(1000);
    digitalWrite(13, LOW);
    delay(500);
  }
  
}
