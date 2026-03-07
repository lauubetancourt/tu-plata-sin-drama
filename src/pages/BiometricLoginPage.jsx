import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { PhoneFrame } from "../components/PhoneFrame";
import { FingerprintIcon, DeleteIcon } from "lucide-react";

const CORRECT_PIN = "1234";
const MAX_ATTEMPTS = 3;

export function BiometricLoginPage() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(null); // null | 'loading' | 'success' | 'error'
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [showPin, setShowPin] = useState(false);
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState(false);

  function handleOpen() {
    setStatus(null);
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
    setStatus(null);
    setShowPin(false);
    setPin("");
    setPinError(false);
  }

  function handleSuccess(e) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setTimeout(() => navigate("/onboarding/1"), 1000);
    }, 1800);
  }

  function handleError(e) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setTimeout(() => {
      const next = failedAttempts + 1;
      setFailedAttempts(next);
      if (next >= MAX_ATTEMPTS) {
        setShowPin(true);
        setStatus(null);
      } else {
        setStatus("error");
      }
    }, 1800);
  }

  function handlePinDigit(digit) {
    if (pin.length >= 4) return;
    const next = pin + digit;
    setPin(next);
    setPinError(false);
    if (next.length === 4) {
      setTimeout(() => {
        if (next === CORRECT_PIN) {
          setStatus("success");
          setTimeout(() => navigate("/onboarding/1"), 1000);
        } else {
          setPinError(true);
          setPin("");
        }
      }, 200);
    }
  }

  function handlePinDelete() {
    setPin((p) => p.slice(0, -1));
    setPinError(false);
  }

  const fingerColor =
    status === "success"
      ? "text-primary"
      : status === "error"
        ? "text-destructive"
        : status === "loading"
          ? "text-muted-foreground animate-pulse"
          : "text-foreground";

  return (
    <PhoneFrame>
      <div className="relative h-full">
        <section className="flex min-h-full flex-col items-center justify-center text-center">
          <Card className="w-full max-w-xs rounded-3xl py-0 ring-0">
            <CardHeader>
              <h1 className="text-3xl font-bold">¡Hola!</h1>
            </CardHeader>
            <CardContent className="px-6 py-8">
              <button
                onClick={handleOpen}
                className="mx-auto mb-5 grid h-20 w-20 cursor-pointer place-items-center rounded-3xl bg-muted transition-opacity hover:opacity-80 active:opacity-60"
              >
                <FingerprintIcon className="h-10 w-10 text-foreground" />
              </button>
              <p className="mt-2 text-sm font-semibold text-muted-foreground">
                Inicia sesión con tu huella
              </p>
            </CardContent>
          </Card>
        </section>

        {open && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/10 backdrop-blur-xs">
            <div className="mx-4 w-full max-w-xs rounded-3xl bg-background p-6 text-center shadow-xl ring-1 ring-foreground/10">

              {!showPin ? (
                <>
                  <p className="text-base font-bold">Confirma tu huella</p>
                  {failedAttempts > 0 && failedAttempts < MAX_ATTEMPTS && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      Intentos restantes: {MAX_ATTEMPTS - failedAttempts}
                    </p>
                  )}

                  <p className="mt-4 min-h-[20px] text-sm">
                    {status === null && "Pon tu dedo en el sensor para iniciar sesión"}
                    {status === "loading" && (
                      <span className="text-muted-foreground">Analizando tu huella...</span>
                    )}
                    {status === "success" && (
                      <span className="font-semibold text-primary">¡Inicio de sesión exitoso!</span>
                    )}
                    {status === "error" && (
                      <span className="font-semibold text-destructive">
                        No reconocimos tu huella. <br/>
                        Intenta de nuevo.
                      </span>
                    )}
                  </p>

                  <button
                    onClick={handleSuccess}
                    onContextMenu={handleError}
                    disabled={status === "loading" || status === "success"}
                    className="mx-auto mt-5 grid h-16 w-16 cursor-pointer place-items-center rounded-full bg-muted transition-colors disabled:cursor-default"
                  >
                    <FingerprintIcon className={`h-9 w-9 transition-colors ${fingerColor}`} />
                  </button>

                  {status !== "success" && (
                    <button
                      onClick={handleClose}
                      disabled={status === "loading"}
                      className="mt-5 w-full text-sm font-semibold text-foreground hover:text-muted-foreground disabled:opacity-40"
                    >
                      Cancelar
                    </button>
                  )}
                </>
              ) : (
                <>
                  <p className="text-base font-bold">Ingresa tu PIN</p>

                  {status === "success" ? (
                    <p className="mt-4 text-sm font-semibold text-primary">¡Inicio de sesión exitoso!</p>
                  ) : (
                    <>
                      {/* Dots */}
                      <div className="mt-5 flex justify-center gap-3">
                        {[0, 1, 2, 3].map((i) => (
                          <span
                            key={i}
                            className={`h-3 w-3 rounded-full transition-colors ${
                              i < pin.length
                                ? pinError
                                  ? "bg-destructive"
                                  : "bg-foreground"
                                : "bg-muted"
                            }`}
                          />
                        ))}
                      </div>
                      {pinError && (
                        <p className="mt-2 text-xs font-semibold text-destructive">
                          PIN incorrecto. Intenta de nuevo.
                        </p>
                      )}

                      {/* Numpad */}
                      <div className="mt-5 grid grid-cols-3 gap-2">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((d) => (
                          <button
                            key={d}
                            onClick={() => handlePinDigit(String(d))}
                            className="flex h-12 items-center justify-center rounded-xl bg-muted text-lg font-semibold transition-opacity hover:opacity-80 active:opacity-60"
                          >
                            {d}
                          </button>
                        ))}
                        <span />
                        <button
                          onClick={() => handlePinDigit("0")}
                          className="flex h-12 items-center justify-center rounded-xl bg-muted text-lg font-semibold transition-opacity hover:opacity-80 active:opacity-60"
                        >
                          0
                        </button>
                        <button
                          onClick={handlePinDelete}
                          className="flex h-12 items-center justify-center rounded-xl bg-muted transition-opacity hover:opacity-80 active:opacity-60"
                        >
                          <DeleteIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </>
                  )}

                  {status !== "success" && (
                    <button
                      onClick={handleClose}
                      className="mt-5 w-full text-sm font-semibold text-foreground hover:text-muted-foreground"
                    >
                      Cancelar
                    </button>
                  )}
                </>
              )}

            </div>
          </div>
        )}
      </div>
    </PhoneFrame>
  );
}
