import React from 'react'

function MoreDetail() {
  return (
    <div>
        <main className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-foreground">Modal Demo</h1>
        <p className="text-muted-foreground max-w-md">
          Click the button below to open a modal dialog with smooth animations and proper accessibility.
        </p>
        <Button onClick={() => setIsModalOpen(true)} size="lg">
          Open Modal
        </Button>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Example Modal">
          <div className="space-y-4">
            <p className="text-muted-foreground">This is a modal dialog built with Tailwind CSS. It includes:</p>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              <li>Smooth fade and scale animations</li>
              <li>Backdrop blur and overlay</li>
              <li>Proper focus management</li>
              <li>Keyboard accessibility (ESC to close)</li>
              <li>Click outside to close</li>
            </ul>
            <div className="flex gap-3 pt-4">
              <Button onClick={() => setIsModalOpen(false)}>Close Modal</Button>
              <Button variant="outline" onClick={() => alert("Action performed!")}>
                Perform Action
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </main>
      
    </div>
  )
}

export default MoreDetail
