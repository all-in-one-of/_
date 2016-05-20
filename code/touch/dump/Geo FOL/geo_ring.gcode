;Sliced at: Fri 16-10-2015 10:58:44
;Basic settings: Layer height: 0.22 Walls: 1.05 Fill: 20
;Print time: 0 minutes
;Filament used: 0.0m 0.0g
;Filament cost: None
;M190 S0 ;Uncomment to add your own bed temperature line
;M109 S0 ;Uncomment to add your own temperature line
G21                     ;metric values
G90                     ;absolute positioning
M82                     ;set extruder to absolute mode
M107                    ;start with the fan off
G28 X0 Y0               ;move X/Y to min endstops
G28 Z0                  ;move Z to min endstops
G1 Z15.0 F10500;move the platform down 15mm
G92 E0                  ; zero the extruded length
G1 F200 E0              ; extrude 3mm of feed stock
G92 E0                  ; zero the extruded length again
G1 F10500      ; set travel speed
M203 X192 Y208 Z3       ; speed limits
M117 Printing...        ; send message to LCD

;Layer count: 1
;LAYER:0
M107
G1 F600 E-1.00000
G1 Z0.100
G0 F10500 X0.000 Y0.000 Z5.312
M400
M104 S0                        ; hotend off
M140 S0                        ; heated bed heater off (if you have it)
M107                           ; fans off
G91                            ; relative positioning
G1 E-1 F300                    ; retract the filament a bit before lifting the nozzle, to release some of the pressure
G1 Z+0.5 E-5 X-20 Y-20 F3000   ; move Z up a bit and retract filament even more
G90                            ; absolute positioning
G1 X0 Y250                     ; move to cooling position
M84                            ; steppers off
G90                            ; absolute positioning
M117 TAZ Ready.
;CURA_PROFILE_STRING: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

