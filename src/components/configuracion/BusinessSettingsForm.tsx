
import React, { useState, useEffect, useRef } from 'react';
import { useStorage } from '../../hooks/useStorage';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id.replace('business-', '')]: id === 'business-tax' ? parseFloat(value) : value
    }));
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
    <div className="flex flex-col gap-8">
      <Card title="Información de la Empresa">
        <form id="business-form" className="space-y-6" onSubmit={handleSubmit}>
          <Input 
            label="Nombre de la Empresa *" 
            id="business-name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
          />
          <Input 
            label="RIF *" 
            id="business-rif" 
            value={formData.rif} 
            onChange={handleChange} 
            required 
            placeholder="J-12345678-9" 
          />
          <Input 
            label="Dirección *" 
            id="business-address" 
            value={formData.address} 
            onChange={handleChange} 
            required 
            isTextArea 
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input 
              label="Teléfono *" 
              id="business-phone" 
              type="tel" 
              value={formData.phone} 
              onChange={handleChange} 
              required 
              placeholder="+58 412-0000000" 
            />
            <Input 
              label="Email *" 
              id="business-email" 
              type="email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input 
              label="IVA (%)" 
              id="business-tax" 
              type="number" 
              value={formData.taxPercentage} 
              onChange={handleChange} 
              min="0" 
              max="100" 
              step="0.1" 
            />
            <Select 
              label="Moneda" 
              id="business-currency" 
              value={formData.currency} 
              onChange={handleChange}
              options={[
                { value: 'USD', label: 'USD ($)' },
                { value: 'Bs', label: 'Bs (Bolívares)' },
                { value: 'EUR', label: 'EUR (€)' },
              ]}
            />
          </div>
        </form>
      </Card>

      <Card title="Logo de la Empresa" subtitle="Sube el logo de tu empresa (opcional)">
        <div className="flex flex-col gap-6 items-center">
          <div className="w-[240px] h-[160px] border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center bg-gray-50 overflow-hidden">
            {logoPreview ? (
              <img src={logoPreview} alt="Logo" className="max-w-full max-h-full object-contain" />
            ) : (
              <p className="text-slate-400">Sin logo</p>
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
            <Button variant="secondary" onClick={() => logoInputRef.current?.click()}>
              📁 Seleccionar Logo
            </Button>
            {logoPreview && (
              <Button variant="danger" onClick={handleRemoveLogo}>
                🗑️ Eliminar Logo
              </Button>
            )}
          </div>
        </div>
      </Card>

      <Card title="Firma Digital" subtitle="Sube tu firma que aparecerá en las facturas">
        <div className="flex flex-col gap-6 items-center">
          <div className="w-[240px] h-[160px] border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center bg-gray-50 overflow-hidden">
            {signaturePreview ? (
              <img src={signaturePreview} alt="Firma" className="max-w-full max-h-full object-contain" />
            ) : (
              <p className="text-slate-400">Sin firma</p>
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
            <Button variant="secondary" onClick={() => signatureInputRef.current?.click()}>
              📁 Seleccionar Firma
            </Button>
            {signaturePreview && (
              <Button variant="danger" onClick={handleRemoveSignature}>
                🗑️ Eliminar Firma
              </Button>
            )}
          </div>
        </div>
      </Card>

      <div className="mt-12 flex justify-center">
        <Button size="lg" className="min-w-[250px] !py-4" variant="success" onClick={handleSubmit}>
          💾 Guardar Configuración
        </Button>
      </div>

      <div className="mt-12 p-8 border-2 border-error rounded-xl text-center">
        <h3 className="text-error text-xl font-bold mb-2">⚠️ Zona de Peligro</h3>
        <p className="text-slate-500 mb-6">Estas acciones son irreversibles</p>
        <Button variant="danger" onClick={handleClearAll}>
          🗑️ Eliminar Todos los Datos
        </Button>
      </div>
    </div>
  );
};

export default BusinessSettingsForm;
