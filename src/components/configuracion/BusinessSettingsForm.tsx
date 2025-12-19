
import React, { useState, useEffect, useRef } from 'react';
import { useStorage } from '@/hooks/useStorage';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export const BusinessSettingsForm: React.FC = () => {
  const { settings, saveSettings, clearAll } = useStorage();
  const [formData, setFormData] = useState(settings);
  const [logoPreview, setLogoPreview] = useState<string | undefined>(settings.logo);
  const [signaturePreview, setSignaturePreview] = useState<string | undefined>(settings.signature);

  const logoInputRef = useRef<HTMLInputElement>(null);
  const signatureInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setFormData(settings);
    setLogoPreview(settings.logo);
    setSignaturePreview(settings.signature);
  }, [settings]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    const field = id.replace('business-', '');
    setFormData(prev => ({
      ...prev,
      [field]: field === 'taxPercentage' ? parseFloat(value) : value
    }));
  };

  const handleCurrencyChange = (value: string) => {
    setFormData(prev => ({ ...prev, currency: value }));
  };

  const convertImageToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleLogoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const base64 = await convertImageToBase64(file);
      setLogoPreview(base64);
      setFormData(prev => ({ ...prev, logo: base64 }));
    }
  };

  const handleSignatureChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const base64 = await convertImageToBase64(file);
      setSignaturePreview(base64);
      setFormData(prev => ({ ...prev, signature: base64 }));
    }
  };

  const handleRemoveLogo = () => {
    setLogoPreview(undefined);
    setFormData(prev => ({ ...prev, logo: undefined }));
  };

  const handleRemoveSignature = () => {
    setSignaturePreview(undefined);
    setFormData(prev => ({ ...prev, signature: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveSettings(formData);
    alert('✅ Configuración guardada exitosamente');
  };

  const handleClearAll = () => {
    if (confirm('⚠️ ADVERTENCIA: Esto eliminará TODOS los clientes, facturas y configuración.\n\n¿Estás completamente seguro?')) {
      if (confirm('Esta acción es IRREVERSIBLE. ¿Continuar?')) {
        clearAll();
        alert('Todos los datos han sido eliminados');
        window.location.reload();
      }
    }
  };

  return (
    <div className="flex flex-col gap-8 pb-12">
      <Card>
        <CardHeader>
          <CardTitle>Información de la Empresa</CardTitle>
          <CardDescription>Detalles básicos de tu negocio para las facturas.</CardDescription>
        </CardHeader>
        <CardContent>
          <form id="business-form" className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid gap-2">
              <Label htmlFor="business-name">Nombre de la Empresa *</Label>
              <Input
                id="business-name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="business-rif">RIF *</Label>
              <Input
                id="business-rif"
                value={formData.rif}
                onChange={handleChange}
                required
                placeholder="J-12345678-9"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="business-address">Dirección *</Label>
              <Textarea
                id="business-address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="grid gap-2">
                <Label htmlFor="business-phone">Teléfono *</Label>
                <Input
                  id="business-phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="+58 412-0000000"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="business-email">Email *</Label>
                <Input
                  id="business-email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="grid gap-2">
                <Label htmlFor="business-taxPercentage">IVA (%)</Label>
                <Input
                  id="business-taxPercentage"
                  type="number"
                  value={formData.taxPercentage}
                  onChange={handleChange}
                  min="0"
                  max="100"
                  step="0.1"
                />
              </div>
              <div className="grid gap-2">
                <Label>Moneda</Label>
                <Select value={formData.currency} onValueChange={handleCurrencyChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar moneda" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD ($)</SelectItem>
                    <SelectItem value="Bs">Bs (Bolívares)</SelectItem>
                    <SelectItem value="EUR">EUR (€)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="grid gap-2">
                <Label>Moneda Secundaria (Referencial)</Label>
                <Select value={formData.secondaryCurrency || 'VES'} onValueChange={(v) => setFormData(prev => ({ ...prev, secondaryCurrency: v }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar moneda" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="VES">VES (Bolívares)</SelectItem>
                    <SelectItem value="USD">USD ($)</SelectItem>
                    <SelectItem value="EUR">EUR (€)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="business-exchangeRate">Tasa de Cambio</Label>
                <div className="relative">
                  <Input
                    id="business-exchangeRate"
                    type="number"
                    step="0.01"
                    className="pl-24"
                    value={formData.exchangeRate || 0}
                    onChange={handleChange}
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground text-sm">
                    1 {formData.currency} =
                  </div>
                </div>
                <p className="text-[0.8rem] text-muted-foreground">
                  Se usará para calcular el monto en {formData.secondaryCurrency || 'VES'}.
                </p>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Logo de la Empresa</CardTitle>
            <CardDescription>Sube el logo de tu empresa (opcional)</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-6 items-center">
            <div className="w-full aspect-video border-2 border-dashed border-muted rounded-lg flex items-center justify-center bg-muted/30 overflow-hidden">
              {logoPreview ? (
                <img src={logoPreview} alt="Logo" className="max-w-full max-h-full object-contain" />
              ) : (
                <p className="text-muted-foreground text-sm">Sin logo</p>
              )}
            </div>
            <div className="flex gap-4">
              <input
                type="file"
                ref={logoInputRef}
                onChange={handleLogoChange}
                accept="image/*"
                className="hidden"
              />
              <Button variant="outline" onClick={() => logoInputRef.current?.click()}>
                Seleccionar Logo
              </Button>
              {logoPreview && (
                <Button variant="destructive" onClick={handleRemoveLogo}>
                  Eliminar
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Firma Digital</CardTitle>
            <CardDescription>Sube tu firma para las facturas</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-6 items-center">
            <div className="w-full aspect-video border-2 border-dashed border-muted rounded-lg flex items-center justify-center bg-muted/30 overflow-hidden">
              {signaturePreview ? (
                <img src={signaturePreview} alt="Firma" className="max-w-full max-h-full object-contain" />
              ) : (
                <p className="text-muted-foreground text-sm">Sin firma</p>
              )}
            </div>
            <div className="flex gap-4">
              <input
                type="file"
                ref={signatureInputRef}
                onChange={handleSignatureChange}
                accept="image/*"
                className="hidden"
              />
              <Button variant="outline" onClick={() => signatureInputRef.current?.click()}>
                Seleccionar Firma
              </Button>
              {signaturePreview && (
                <Button variant="destructive" onClick={handleRemoveSignature}>
                  Eliminar
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center pt-4">
        <Button size="lg" className="min-w-[250px]" onClick={handleSubmit}>
          Guardar Configuración
        </Button>
      </div>

      <Card className="border-destructive/50 bg-destructive/5">
        <CardHeader>
          <CardTitle className="text-destructive">Zona de Peligro</CardTitle>
          <CardDescription>Estas acciones son irreversibles</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="destructive" onClick={handleClearAll}>
            Eliminar Todos los Datos
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessSettingsForm;
